const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

//middleware
app.use(express.json());

app.post('/createMail', async (req, res) => {
  const { to, email_body } = req.body;

  //catch error
  if (`${to}` == 0 || `${email_body}` == 0) {
    res.send({ success: false, message: 'Error Message' });
  } else {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'mhzuq......@ethereal.email', // ethereal user
        pass: 'yVWjPKP.......', // ethereal password
      },
    });

    const msg = {
      from: '"The Exapress App" <theExpressApp@example.com>', // sender address
      to: `${to}`, // list of receivers
      subject: 'Subject Unknown', // Subject line
      text: `${email_body}`, // plain text body
    };
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.send({ success: true, message: 'Email Sent Successfully' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log('Listening at port ' + PORT));
