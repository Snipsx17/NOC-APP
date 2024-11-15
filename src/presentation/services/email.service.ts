import { envs } from "@/config/plugins/envs.plugin";
import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;

  HTMLbody: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_ADDRESS,
      pass: envs.MAILER_SECRET,
    },
  });

  async send(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, HTMLbody } = options;
    try {
      const sendEmailInformation = await this.transporter.sendMail({
        to,
        subject,
        html: HTMLbody,
      });
      console.log(sendEmailInformation);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
