import { LogEntity, LogSeverityLevel } from "../entities/log-entity";
import { LogDataRepository } from "../respository/log.respository";

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
      const log = new LogEntity(LogSeverityLevel.low, `${url} IS UP.`);
      this.logRepository.saveLog(log);
      this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity(LogSeverityLevel.low, `${error}}`);
      this.logRepository.saveLog(log);
      this.errorCallback(`${error}}`);
      return false;
    }
  }
}
