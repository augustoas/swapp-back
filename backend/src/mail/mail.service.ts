import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    ) { }

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
      context: { // ✏️ filling curly brackets with content
        resetLink: `${process.env.BASE_FRONT_URL}${token}/recoverpassword`
      },
    });
  }
}