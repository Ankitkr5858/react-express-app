const nodeMailer = require("nodemailer");
const Email = require('email-templates');

class EmailService {
    async otp(user) {
        this.sendEmail('otp', user.email, {otp: user.otp});
    }

    async sendEmail(template, receiver, locals) {
        const email = new Email({
            message: {
                from: `Ankit from React App <${this.sender()}>`
            },
            transport: this.smtpTransport()
        });

        await email.send({
            template: template,
            message: {to: receiver},
            locals
        }).catch(console.error);
    }

    smtpTransport() {
        return nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.sender(),
                pass: this.password()
            }
        });
    }

    sender() {
        return process.env.EMAIL_SENDER;
    }

    password() {
        return process.env.EMAIL_PASSWORD;
    }
}

module.exports = new EmailService();
