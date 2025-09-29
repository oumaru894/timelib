import { BaseService } from "medusa-interfaces";
import nodemailer from "nodemailer";

class GoogleEmailService extends BaseService {
  constructor({}, options) {
    super();
    this.options_ = options;

    this.transporter_ = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_SENDER_EMAIL, // The email you are sending from
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });
  }

  /**
   * Sends a notification.
   * @param {string} event - the name of the event
   * @param {object} data - the data of the event
   * @param {object} attachmentGenerator - an optional attachment generator
   * @returns {void}
   */
  async sendNotification(event, data, attachmentGenerator) {
    let subject = "";
    let html = "";
    const toEmail = data.email || data.customer?.email;

    // Ensure we have a recipient email
    if (!toEmail) {
        console.warn(`No recipient email found for event: ${event}`);
        return;
    }

    switch (event) {
      case "order.placed":
        subject = `Order Confirmation #${data.display_id}`;
        html = `
          <h1>Thank you for your order!</h1>
          <p>Your order #${data.display_id} has been placed successfully.</p>
          <p>We will notify you again once it has shipped.</p>
        `;
        break;

      // Add other cases for different events like 'order.shipped', 'customer.password_reset', etc.
      // case "order.shipped":
      //   subject = `Your order #${data.display_id} has shipped!`;
      //   html = `<h1>Your order has shipped!</h1><p>Tracking number: ${data.tracking_links?.[0]?.tracking_number || 'N/A'}</p>`;
      //   break;

      default:
        return; // Don't send emails for unhandled events
    }

    const mailOptions = {
      from: this.options_.from || process.env.GMAIL_SENDER_EMAIL,
      to: toEmail,
      subject: subject,
      html: html,
    };

    try {
      console.log(`Sending email for event: ${event} to ${toEmail}`);
      await this.transporter_.sendMail(mailOptions);
      console.log(`Email for ${event} sent successfully!`);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

export default GoogleEmailService;