const OtpValidator = require("./otp");
const validator = new OtpValidator()

console.log(validator.getToken())
