import express from 'express';
import setupNodemailer from '../config/node-mail-setup.mjs';

const router = express.Router();
const transporter = setupNodemailer();

// Email route
router.get('/send-email', async (req, res) => {
  try {
    const toEmail = 'atishay23@gmail.com';

    // Email content
    const mailOptions = {
      from: 'test@gmail.com',
      to: toEmail,
      subject: 'Test Email Notification',
      text: 'This is a test email notification.',
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info);

    res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).send('Error sending email');
  }
});

export default router;
