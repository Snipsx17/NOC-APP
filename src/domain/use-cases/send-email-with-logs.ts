import { EmailService } from "@/presentation/services/email.service";
import { LogDataRepository } from "../respository/log.respository";
import { LogEntity, LogSeverityLevel } from "../entities/log-entity";
import path from "node:path";

interface SendEmailWithLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailWithLogs implements SendEmailWithLogsUseCase {
  constructor(
    readonly emailService: EmailService,
    readonly logRepository: LogDataRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const emailSent = await this.emailService.sendEmailWithLogs({
        to,
        subject: `Logs date: ${new Date()}`,
        HTMLbody: `
             <h1>Service status</h1>
             <h3>Logs from the day: ${new Date()}</h3>
             <br />
             <p>Commodo aliquip ipsum laborum sit dolore ad ea dolor proident velit et aliquip. Dolore eiusmod aliquip adipisicing in quis laborum sit. Duis magna nisi cillum nisi aliqua officia adipisicing sint non Lorem quis excepteur commodo.</p>`,
      });

      if (!emailSent) {
        throw new Error(`Email with logs not sent`);
      }
      const log = new LogEntity({
        severity: LogSeverityLevel.high,
        message: "Email with logs sent",
        origin: path.basename(__filename),
      });

      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        severity: LogSeverityLevel.high,
        message: "Email with logs not sent",
        origin: path.basename(__filename),
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
