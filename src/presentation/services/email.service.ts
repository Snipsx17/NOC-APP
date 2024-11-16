import { envs } from "@/config/plugins/envs.plugin";
import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  attachments?: Attachment[];
  HTMLbody: string;
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_ADDRESS,
      pass: envs.MAILER_SECRET,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, HTMLbody, attachments = [] } = options;
    try {
      const sendEmailInformation = await this.transporter.sendMail({
        to,
        subject,
        html: HTMLbody,
        attachments,
      });
      console.log(sendEmailInformation);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sendEmailWithLogs(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, HTMLbody } = options;
    const attachments = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
      {
        filename: "logs-low.log",
        path: "./logs/logs-low.log",
      },
    ];
    return await this.sendEmail({ to, subject, HTMLbody, attachments });
  }
}
