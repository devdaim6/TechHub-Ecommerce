const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

export const sendOtpToMobile = async (recipientNumber, otp) => {
  let body = `Your temporary password is: ${otp}`;
  try {
    const response = await client.messages.create({
      body: body,
      from: "+12015817266",
      to: `+91${recipientNumber}`,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
