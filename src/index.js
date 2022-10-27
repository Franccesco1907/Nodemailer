const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (to, subject, message) => {
  const pathToAttachment = "./test.pdf";
  fs.readFile(path.join(__dirname, pathToAttachment), (err, data) => {
    if (err) {
      console.error(err);
    }
    if (data) {
      const msg = {
        from: process.env.EMAIL_SENDER,
        to,
        subject,
        text: message,
        attachments: [
          {
            content: data.toString("base64"),
            filename: "test.pdf",
            type: "application/pdf",
            disposition: "attachment",
          },
        ],
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

sendMail(
  ["example@gmail.com", "example@hotmail.com"],
  "Email test",
  "Body of email test."
);
