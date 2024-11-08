export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public message: string;
  public severity: LogSeverityLevel;
  public createdAt: Date;

  constructor(severity: LogSeverityLevel, message: string) {
    this.severity = severity;
    this.message = message;
    this.createdAt = new Date();
  }
}
