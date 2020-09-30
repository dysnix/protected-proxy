const otp = require('otplib')

class OtpValidator {
    constructor() {
        this.secret = process.env.OTP_SECRET
        if (!this.secret) {
            throw new Error("Please set `OTP_SECRET` env variable");
        }

        this.token = otp.authenticator.generate(this.secret);
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

