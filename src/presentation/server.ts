import { CronJob } from "cron";
import { CronService } from "./services.cron-service";
import { CheckService } from "../domain/use-cases/check-sevice.use-case";

export class Server {
  public static start() {
    const url = "http://localhost:3000/posts";
    console.log("Server started...");
    CronService.createService("*/3 * * * * *", () => {
      new CheckService(
        () => console.log("\x1b[42m", `Service: ${url} IS UP.`),
        () => console.error("\x1b[41m", `Service ${url} IS DOWN.`),
      ).execute(url);
    });
  }
}
