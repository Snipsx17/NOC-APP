import { LogModel } from "@/data/mongo/models/log.model";
import { LogDataSource } from "@/domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "@/domain/entities/log-entity";
import { json } from "stream/consumers";

export class MongoLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    // await LogModel.create(log);
    try {
      const logModel = new LogModel(log);
      const logSaved = await logModel.save();
      console.log(`Log saved: ${logSaved._id}`);
    } catch (error) {
      console.error(`Error saving log: ${error}`);
    }
  }
  async getLog(severity: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      severity,
    });

    return logs.map((log) => {
      return LogEntity.fromJson(JSON.stringify(log));
    });
  }
}
