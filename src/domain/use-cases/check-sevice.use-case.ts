interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
  public async execute(url: string) {
    try {
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error();
      }
      console.log("\x1b[42m", `Service: ${url} IS UP.`);
      return true;
    } catch (error) {
      console.error("\x1b[41m", `Service ${url} IS DOWN.`);
      return false;
    }
  }
}
