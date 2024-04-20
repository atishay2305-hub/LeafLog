const nodemailer = require('nodemailer');

const sendEmail = async (userEmail, formData) => {
  const { title, description } = formData;

  try {
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    // Email content
    const mailOptions = {
      from: userEmail,
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
