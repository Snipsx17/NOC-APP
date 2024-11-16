import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository";
import { FileSystemDataSource } from "@/infrastructure/datasources/file-system.datasource";
import { EmailService } from "./services/email.service";
import { SendEmailWithLogs } from "@/domain/use-cases/send-email-with-logs";

const FileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    const url = "http://uhernandez.com";

    // CronService.createService("*/3 * * * * *", () => {
    //   new CheckService(
    //     FileSystemLogRepository,
    //     () => console.log("\x1b[42m", `Service: ${url} IS UP.`),
    //     () => console.error("\x1b[41m", `Service ${url} IS DOWN.`),
    //   ).execute(url);
    // });

    new SendEmailWithLogs(emailService, FileSystemLogRepository).execute([
      "snipsx0912@gmail.com",
      "contact@uhernandez.com",
    ]);

    // new EmailService().sendEmailWithLogs({
    //   to: ["snipsx0912@gmail.com", "contact@uhernandez.com"],
    //   subject: `Logs date: ${new Date()}`,
    //   HTMLbody: `
    //    <h1>Service status</h1>
    //    <h3>Logs from the day: ${new Date()}</h3>
    //    <br />
    //    <p>Commodo aliquip ipsum laborum sit dolore ad ea dolor proident velit et aliquip. Dolore eiusmod aliquip adipisicing in quis laborum sit. Duis magna nisi cillum nisi aliqua officia adipisicing sint non Lorem quis excepteur commodo.</p>
    //  `,
    // });
  }
}
