import path from "node:path";
import { LogEntity, LogSeverityLevel } from "@/domain/entities/log-entity";
import { LogDataRepository } from "@/domain/respository/log.respository";

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogDataRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  public async execute(url: string) {
    try {
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error(`${url} IS DOWN.`);
      }

      const log = new LogEntity({
        severity: LogSeverityLevel.low,
        message: `${url} IS UP.`,
        origin: path.basename(__filename),
        createdAt: new Date(),
      });
      this.logRepository.saveLog(log);
      this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity({
        severity: LogSeverityLevel.low,
        message: `${error}, ${url} IS DOWN.`,
        origin: path.basename(__filename),
        createdAt: new Date(),
      });
      this.logRepository.saveLog(log);
      this.errorCallback(`${error}}`);
      return false;
    }
  }
}
