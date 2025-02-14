import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as mailgun from 'mailgun-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailInvitationService {
    private transporter: nodemailer.Transporter;
    private mg: mailgun.Mailgun;

    constructor(private configService: ConfigService) {
        const domain = this.configService.get('MAILGUN_DOMAIN');
        const apiKey = this.configService.get('MAILGUN_API_KEY');

        const user = this.configService.get('MAILGUN_USER')
        const pass = this.configService.get('MAILGUN_PASS')

        this.transporter = nodemailer.createTransport({
            host: "smtp.mailgun.org", 
            port: 587,
            secure: false,
            auth: {
                user,
                pass
            },
        });
        this.mg = mailgun({ apiKey, domain });
    }

    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: 'jeremyjvf16@gmail.com', 
            to,  
            subject, 
            text, 
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { message: 'Email sent succesfully', info };
        } catch (error) {
            console.error('Error:', error);
            throw new Error(`The message could not be send: ${error.message}`);
        }
    }
}
