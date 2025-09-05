export const EmailTemplates = {
  ORDER_PLACED: {
    id: "order_placed",
    subject: "Your TimeLib Order Confirmation",
    html: (order: any, shippingAddress: any) => `
      <h2>Thank you for your order!</h2>
      <p>Order ID: <strong>${order.display_id}</strong></p>
      <p>Shipping to: ${shippingAddress.first_name} ${shippingAddress.last_name}, ${shippingAddress.address_1}, ${shippingAddress.city}, ${shippingAddress.country_code}</p>
      <p>We will notify you once your order is shipped.</p>
    `,
    text: (order: any, shippingAddress: any) =>
      `Thank you for your order!\nOrder ID: ${order.display_id}\nShipping to: ${shippingAddress.first_name} ${shippingAddress.last_name}, ${shippingAddress.address_1}, ${shippingAddress.city}, ${shippingAddress.country_code}`
  }
}
