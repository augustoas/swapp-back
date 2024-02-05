import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  private emailQueue: any[] = [];
  private isSending = false;
  /**
   * Enqueues an email to be sent.
   * 
   * @param data - The email data.
   * @param method - The method used to send the email.
   */
  enqueueEmail(data: any, method: string) {
    this.emailQueue.push({data, method});
    // Start processing the queue if it's not already being processed
    if (!this.isSending) {
      this.processEmailQueue();
    }
  }

  /**
   * Processes the email queue and sends emails based on the specified method.
   * @param method - The method to determine which type of email to send.
   * @returns A Promise that resolves when the email queue has been processed.
   */
  private async processEmailQueue(): Promise<void> {
    this.isSending = true;
    while (this.emailQueue.length > 0) {
      const nextEmail = this.emailQueue.shift();
      const emailData = nextEmail.data;
      const method = nextEmail.method;
      switch (method) {
        case 'sendResetPassword':
          await this.sendResetPassword(emailData.email, emailData.token);
          break;
        default:
          console.error(`Unsupported email method: ${method}`);
      }
    }
    this.isSending = false;
  }

  async sendUserConfirmation(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Equipo de gestión corporativa" <gestioncorporativa.lovalledor@outlook.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './test', // `.hbs` extension is appended automatically
      // context: { // ✏️ filling curly brackets with content
      //   name: user.firstname + ' ' + user.lastname,
      // },
    });
  }

  async sendResetPassword(email, token) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Request to reset your password.',
      template: './resetPassword', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        resetLink: `${process.env.BASE_FRONT_URL}${token}/recoverpassword`,
      },
    });
  }
}
