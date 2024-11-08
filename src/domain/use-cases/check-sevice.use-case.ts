interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  public async execute(url: string) {
    try {
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error();
      }
      this.successCallback();

      return true;
    } catch (error) {
      this.errorCallback(`Service ${url} IS DOWN.`);
      return false;
    }
  }
}
