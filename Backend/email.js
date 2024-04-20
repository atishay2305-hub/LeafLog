// email.js
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../Backend/models/User');

const sendEmail = async (senderEmail, formData) => {
  if (!senderEmail || !formData) {
    console.error('Sender email or formData is undefined');
    return; // or handle the error appropriately
  }

  const { title, description } = formData;
  try {
    // Find the user in the database
    const user = await User.findOne({ email: senderEmail });

    if (!user) {
      throw new Error('User not found');
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail, // Use the sender's email
        pass: user.password, // Use the sender's password
      },
    });

    // Email content
    const mailOptions = {
      from: senderEmail,
      to: 'atishay23@gmail.com',
      subject: title,
      text: description,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

module.exports = sendEmail;
