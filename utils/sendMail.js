const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_MAIL_API_KEY);

export const sendMail = async (
  reciepient,
  type,
  otp,
  expiration,
  orderId,
  username
) => {
  let subject = "";
  let title = "";
  let message = "";

  const commonStyles = `
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  `;

  const headerStyles = `
    background-color: #f4f4f4;
    padding: 20px;
    text-align: center;
  `;

  const contentStyles = `
    padding: 20px;
  `;

  switch (type) {
    case "otp":
      subject = "Your OTP for Verification";
      title = `Email Verification - TechHub`;
      message = `
        <div style="${commonStyles}">
          <div style="${headerStyles}">
            <h2>Hello ${username}!</h2>
          </div>
          <div style="${contentStyles}">
            <p>Your OTP for verification is: <strong>${otp}</strong></p>
            <p>Use this code to complete the verification process.</p>
            <p>This code will expire at ${new Date(
              expiration
            ).toLocaleTimeString()}.</p>
          </div>
        </div>
      `;
      break;

    case "recoverEmail":
      subject = "Email Recovery";
      title = `Recover your Email - TechHub`;
      message = `
        <div style="${commonStyles}">
          <div style="${headerStyles}">
            <h2>Hello ${username}!</h2>
          </div>
          <div style="${contentStyles}">
            <p>Your email recovery information:</p>
            <br/>
            <p>your Account  is associated with this email address : <strong>${reciepient}
            </strong>
</p>          
          </div>
        </div>
      `;
      break;

    case "recoverUsername":
      subject = "Username Recovery";
      title = `Recover your Username - TechHub`;
      message = `
          <div style="${commonStyles}">
            <div style="${headerStyles}">
              <h2>Dear user!</h2>
            </div>
            <div style="${contentStyles}">
              <p>Your username recovery information</p>
              <br/>
              <p>your username is : <strong>${username}
              </strong>
</p>            </div>
          </div>
        `;
      break;

    case "account":
      subject = "Welcome to Techhub";
      title = `Get Started with Techhub - TechHub`;
      message = `
        <div style="${commonStyles}">
        <div style="${headerStyles}">
        <h2>Hello ${username}!</h2>
          </div>
          <div style="${contentStyles}">
            <p>Welcome to our platform! We're excited to have you on board.</p>
             
          </div>
        </div>
      `;
      break;

    case "order":
      subject = "Order Confirmation";
      title = `Order Confirmation - TechHub`;
      message = `
        <div style="${commonStyles}">
          <div style="${headerStyles}">
            <h2>Thank you for your order, ${username}!</h2>
          </div>
          <div style="${contentStyles}">
            <p>Your order (ID: ${orderId}) has been confirmed.</p>
            <!-- Add order details, tracking links, etc. -->
          </div>
        </div>
      `;
      break;

    default:
      console.log("Unknown Email Type");
      break;
  }

  const msg = {
    to: reciepient,
    from: {
      email: "daimdev6@gmail.com",
      name: title,
    },
    subject: subject,
    html: message,
  };
  
  try {
    await sgMail.send(msg);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
