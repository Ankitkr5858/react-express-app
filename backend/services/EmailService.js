const nodeMailer = require("nodemailer");
const Email = require('email-templates');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

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
        const oauth2Client = new OAuth2(this._clientId(), this._clientSecret(), this._clientRedirectUrl());
        oauth2Client.setCredentials({refresh_token: this._clientRefreshToken()});
        const accessToken = oauth2Client.getAccessToken();

        return nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                clientId: this._clientId(),
                clientSecret: this._clientSecret(),
                refreshToken: this._clientRefreshToken(),
                accessToken: accessToken,
                user: this._sender()
            }
        });
    }

    _clientId() {
        return process.env.EMAIL_CLIENT_ID;
    }

    _clientRefreshToken() {
        return process.env.EMAIL_CLIENT_REFRESH_TOKEN;
    }

    _clientSecret() {
        return process.env.EMAIL_CLIENT_SECRET;
    }

    _clientRedirectUrl() {
        return process.env.EMAIL_CLIENT_REDIRECT_URL;
    }

    _sender() {
        return process.env.EMAIL_SENDER;
    }
}

module.exports = new EmailService();
