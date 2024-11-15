import { CronService } from "./services/cron-service";
import { CheckService } from "@/domain/use-cases/check-sevice.use-case";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository";
import { FileSystemDataSource } from "@/infrastructure/datasources/file-system.datasource";
import { envs } from "@/config/plugins/envs.plugin";
import { EmailService } from "./services/email.service";

const FileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);

export class Server {
  public static start() {
    console.log("Server started...");

    const url = "http://uhernandez.com";
    new EmailService().send({
      to: "snipsx0912@gmail.com",
      subject: "test email",
      HTMLbody: `
      <h1>Service status</h1>
      <br />
      <p>Commodo aliquip ipsum laborum sit dolore ad ea dolor proident velit et aliquip. Dolore eiusmod aliquip adipisicing in quis laborum sit. Duis magna nisi cillum nisi aliqua officia adipisicing sint non Lorem quis excepteur commodo.</p>
    `,
    });

    // CronService.createService("*/3 * * * * *", () => {
    //   new CheckService(
    //     FileSystemLogRepository,
    //     () => console.log("\x1b[42m", `Service: ${url} IS UP.`),
    //     () => console.error("\x1b[41m", `Service ${url} IS DOWN.`),
    //   ).execute(url);
    // });
  }
}
