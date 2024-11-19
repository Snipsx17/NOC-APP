import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository";
import { FileSystemDataSource } from "@/infrastructure/datasources/file-system.datasource";
import { EmailService } from "./services/email.service";
import { CronService } from "./services/cron-service";
import { CheckService } from "@/domain/use-cases/check-sevice.use-case";
import { MongoLogDatasource } from "@/infrastructure/datasources/mongo-log.datasource";

const FileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);

const MongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    const url = "http://uhernandez.com";

    CronService.createService("*/3 * * * * *", () => {
      new CheckService(
        MongoLogRepository,
        () => console.log("\x1b[42m", `Service: ${url} IS UP.`),
        () => console.error("\x1b[41m", `Service ${url} IS DOWN.`),
      ).execute(url);
    });
  }
}
