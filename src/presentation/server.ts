import { CronJob } from "cron";
import { CronService } from "./services.cron-service";
import { CheckService } from "../domain/use-cases/check-sevice.use-case";

export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createService("*/3 * * * * *", () => {
      new CheckService().execute("http://localhost:3000/posts");
    });
  }
}
