export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  severity: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public message: string;
  public severity: LogSeverityLevel;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { severity, message, origin, createdAt = new Date() } = options;
    this.severity = severity;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  public static fromJson(logString: string): LogEntity {
    const { severity, message, createdAt, origin } = JSON.parse(logString);
    const logInstance = new LogEntity({ severity, message, origin });
    logInstance.createdAt = new Date(createdAt);
    return logInstance;
  }
}
