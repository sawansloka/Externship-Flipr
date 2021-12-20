const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());

nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.log('success: true' + '\n' + 'message: Email sent successfully');
    return process.exit(1);
  }

  console.log('Sending message...');

  let transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  let message = {
    to: 'Recipient <recipient@example.com>',
    email_body: 'Hello to myself!',
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log('success: false' + '\n' + 'message: Error message');
      return process.exit(1);
    }

    console.log('success: true' + '\n' + 'message: Email sent successfully');
  });
});

const PORT = 3009;
app.listen(PORT, () => {
  console.log('Listening at Port ' + PORT);
});
