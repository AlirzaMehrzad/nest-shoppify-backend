import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // or your provider
      port: 465, //587
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'alirza.mehrzad@gmail.com', // e.g. your@gmail.com
        pass: 'dzsxakssugicyjok', // app password
      },
    });
  }

  sendMail = async (to: string, subject: string, html: string) => {
    return await this.transporter.sendMail({
      from: 'Shoppify <',
      to,
      subject,
      html,
    });
  };
}
