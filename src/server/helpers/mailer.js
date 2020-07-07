const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `That developer <${process.env.EMAIL_SEND_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // 1. send grid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_SEND_HOST,
      port: process.env.EMAIL_SEND_PORT,
      auth: {
        user: process.env.EMAIL_SEND_FROM,
        pass: process.env.EMAIL_SEND_PASSWORD
      }
    });
  }

  // Send the email
  async send(template, subject) {
    // 1. Render HTML base on pug template
    const html = pug.renderFile(
      `${__dirname}/../template/email/${template}.pug`,
      { firstName: this.firstName, url: this.url, subject }
    );

    // 2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3. Create a transport and email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Tiny Talk');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (only valid for 10 minutes)'
    );
  }
};
