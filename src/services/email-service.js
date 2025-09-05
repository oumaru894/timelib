// src/services/email-service.js
import nodemailer from "nodemailer";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail", // or "outlook", or custom "smtp"
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password
      },
    });
  }

  async sendOrderConfirmation(to, order) {
    const mailOptions = {
      from: `"TimeLib Store" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Order Confirmation #${order.display_id}`,
      text: `Thank you for your order! Order ID: ${order.display_id}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for shopping with us!</p>
        <p><strong>Order ID:</strong> ${order.display_id}</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
