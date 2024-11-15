import { LogEntity, LogSeverityLevel } from "@/domain/entities/log-entity";

export abstract class LogDataRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(severity: LogSeverityLevel): Promise<LogEntity[]>;
}
