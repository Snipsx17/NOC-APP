import fs from "node:fs";
import { LogDataSource } from "@/domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "@/domain/entities/log-entity";

export class FileSystemDataSource implements LogDataSource {
  private readonly logsPath = "logs/";
  private readonly AllLogsPath = "logs/logs-all.log";
  private readonly lowLevelLogsPath = "logs/logs-low.log";
  private readonly mediumLevelLogsPath = "logs/logs-medium.log";
  private readonly highLevelLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsPath();
  }

  private createLogsPath() {
    if (!fs.existsSync(this.logsPath)) fs.mkdirSync(this.logsPath);

    [
      this.AllLogsPath,
      this.lowLevelLogsPath,
      this.mediumLevelLogsPath,
      this.highLevelLogsPath,
    ].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logContent = JSON.stringify(newLog);
    fs.appendFileSync(this.AllLogsPath, `${logContent}\n`);

    switch (newLog.severity) {
      case LogSeverityLevel.low:
        fs.appendFileSync(this.lowLevelLogsPath, `${logContent}\n`);
        break;

      case LogSeverityLevel.medium:
        fs.appendFileSync(this.mediumLevelLogsPath, `${logContent}\n`);
        break;

      case LogSeverityLevel.high:
        fs.appendFileSync(this.highLevelLogsPath, `${logContent}\n`);
        break;

      default:
        throw new Error(`Invalid severity level: ' + ${newLog.severity}`);
    }

    return Promise.resolve();
  }

  private getLogFromPath(path: string): LogEntity[] {
    const logFileContent = fs.readFileSync(path, "utf8");
    return logFileContent.split("\n").map(LogEntity.fromJson);
  }

  async getLog(severity: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severity) {
      case LogSeverityLevel.low:
        return this.getLogFromPath(this.lowLevelLogsPath);

      case LogSeverityLevel.medium:
        return this.getLogFromPath(this.mediumLevelLogsPath);

      case LogSeverityLevel.high:
        return this.getLogFromPath(this.highLevelLogsPath);

      default:
        throw new Error(`Invalid severity level: ' + ${severity}`);
    }
  }
}
