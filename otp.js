const otp = require('otplib')

class OtpValidator {
    constructor() {
        this.secret = process.env.OTP_SECRET
        if (!this.secret) {
            throw new Error("Please set `OTP_SECRET` env variable");
        }

        otp.totp.options = {window: 10};
    }

    getToken() {
        return otp.authenticator.generate(this.secret);
    }

    isTokenValid(token) {
        const secret = this.secret
        return otp.authenticator.verify({token, secret});
    }
}

module.exports = OtpValidator;

