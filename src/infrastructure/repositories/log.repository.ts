import { LogDataSource } from "@/domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "@/domain/entities/log-entity";
import { LogDataRepository } from "@/domain/respository/log.respository";

export class LogRepositoryImpl implements LogDataRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }

  getLog(severity: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLog(severity);
  }
}
