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
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #000; color: #FFD700; padding: 20px; text-align: center;">
      <h1 style="margin: 0;">⏱️ TimeLib Store</h1>
      <p style="margin: 0; font-size: 14px;">Affordable Luxury Watches in Liberia</p>
    </div>

    <!-- Greeting -->
    <div style="padding: 20px;">
      <p>Hi ${order.shipping_address.first_name},</p>
      <p>Thank you for shopping with <strong>TimeLib</strong>! Your order has been received and is now <strong>${order.status}</strong>.</p>
    </div>

    <!-- Order Info -->
    <div style="padding: 20px; background-color: #f9f9f9; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
      <p><strong>Order Number:</strong> #${order.display_id}</p>
      <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
      <p><strong>Payment Status:</strong> Pending</p>
      <p><strong>Total:</strong> $${order.summary.current_order_total} ${order.currency_code.toUpperCase()}</p>
    </div>

    <!-- Shipping Address -->
    <div style="padding: 20px;">
      <h3 style="margin-top: 0;">Shipping Address</h3>
      <p>
        ${order.shipping_address.first_name} ${order.shipping_address.last_name}<br/>
        ${order.shipping_address.address_1}<br/>
        ${order.shipping_address.city}, ${order.shipping_address.country_code.toUpperCase()}<br/>
        Phone: ${order.shipping_address.phone}
      </p>
    </div>

    <!-- Items -->
    <div style="padding: 20px;">
      <h3 style="margin-top: 0;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th align="left" style="padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
            <th align="right" style="padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
            <th align="right" style="padding: 8px; border-bottom: 1px solid #ddd;">Qty</th>
            <th align="right" style="padding: 8px; border-bottom: 1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">
                <strong>${item.title}</strong><br/>
                <span style="font-size: 12px; color: #666;">${item.variant_title}</span>
              </td>
              <td align="right" style="padding: 8px; border-bottom: 1px solid #eee;">$${item.unit_price}</td>
              <td align="right" style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
              <td align="right" style="padding: 8px; border-bottom: 1px solid #eee;">$${item.unit_price * item.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="padding: 20px; background-color: #000; color: #FFD700; text-align: center;">
      <p style="margin: 0; font-size: 14px;">TimeLib • Monrovia, Liberia</p>
      <p style="margin: 0; font-size: 12px;">Thank you for choosing TimeLib for your style and timekeeping!</p>
    </div>
  </div>
`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
