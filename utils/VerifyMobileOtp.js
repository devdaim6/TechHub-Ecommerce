const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);
export const verifyMobileOtp = async (serviceId, code, reciepientMobile) => {
  client.verify.v2
    .services(serviceId)
    .verificationChecks.create({ to: reciepientMobile, code: code })
    .then((verification_check) => {
      console.log(verification_check.status);
      return verification_check.status;
    });
};
