const nodeMailer = require("nodemailer");
const Email = require('email-templates');

/**
 * Service for all email sending.
 *
 * @class EmailService
 * @constructor
 */
class EmailService {

    /**
     * Sends OTP email
     * @param {mongoose.Schema} user - mongoose model.
     * @return
     */
    async otp(user) {
        this._sendEmail('otp', user.email, {otp: user.otp});
    }

    /**
     * Initiates method sending
     * @param {string} template - of email template.
     * @param {string} receiver - email of receiver user.
     * @param {object} locals - local variables, which are supplied for email template.
     * @return
     */
    async _sendEmail(template, receiver, locals) {
        const email = new Email({
            message: {
                from: `Ankit from React App <${this._sender()}>`
            },
            transport: this._smtpTransport()
        });

        await email.send({
            template: template,
            message: {to: receiver},
            locals
        }).catch(console.error);
    }

    _smtpTransport() {
        return nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this._sender(),
                pass: this._password()
            }
        });
    }

    _sender() {
        return process.env.EMAIL_SENDER;
    }

    _password() {
        return process.env.EMAIL_PASSWORD;
    }
}

module.exports = new EmailService();
