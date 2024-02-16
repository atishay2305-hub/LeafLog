import nodemailer from 'nodemailer';

// Nodemailer setup function
const setupNodemailer = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'test@gmail.com',
      pass: 'test_pass',
    },
  });
};

export default setupNodemailer;
