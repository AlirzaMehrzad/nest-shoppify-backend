import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Processor('mailQueue')
export class MailProcessor {
  constructor(private readonly mailer: NodemailerService) {}

  @Process('sendMail')
  async handleSendMail(job: Job) {
    const { to, subject, html } = job.data;
    await this.mailer.sendMail(to, subject, html);
  }
}
