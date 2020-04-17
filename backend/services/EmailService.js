const nodemailer = require('nodemailer');
const Email = require('email-templates');
const mg = require('nodemailer-mailgun-transport');

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
     */
    async otp(user) {
        this._sendEmail('otp', user.email, {otp: user.otp});
    }

    /**
     * Initiates method sending
     * @param {string} template - of email template.
     * @param {string} receiver - email of receiver user.
     * @param {object} locals - local variables, which are supplied for email template.
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
        const auth = {
            auth: {
                api_key: this._mailgunKey(),
                domain: this._mailgunDomain()
            }
        };
        return nodemailer.createTransport(mg(auth));
    }


    _mailgunKey() {
        return process.env.MAILGUN_KEY;
    }

    _mailgunDomain() {
        return process.env.MAILGUN_DOMAIN;
    }

    _sender() {
        return process.env.EMAIL_SENDER;
    }
}

module.exports = new EmailService();
