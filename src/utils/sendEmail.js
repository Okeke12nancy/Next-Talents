// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const message = {
//     from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   const info = await transporter.sendMail(message);

//   console.log("Message sent: %s", info.messageId);
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL_TEST,
      pass: process.env.EMAIL_TEST_APP_PSWD,
    },
  });

  const message = {
    from: `${process.env.EMAIL_TEST} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
