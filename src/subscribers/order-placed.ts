import type { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa';
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils';
import { log } from 'console';

export default async function sendOrderConfirmationHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const notificationModuleService = container.resolve(Modules.NOTIFICATION);
console.log(`🟢 order.placed event received for order id: ${data.id}`);
  const {
    data: [order],
  } = await query.graph({
    entity: 'order',
    fields: [
      'id',
      'currency_code',
      'total',
      'subtotal',
      'tax_total',
      'discount_total',
      'discount_tax_total',
      'original_total',
      'original_tax_total',
      'item_total',
      'item_subtotal',
      'item_tax_total',
      'original_item_total',
      'original_item_subtotal',
      'original_item_tax_total',
      'shipping_total',
      'shipping_subtotal',
      'shipping_tax_total',
      'original_shipping_tax_total',
      'original_shipping_subtotal',
      'original_shipping_total',
      'email',
      'shipping_address.*',
      'billing_address.*',
      'customer_id',
      'items.*',
      'items.subtotal',
      'items.tax_total',
      'items.total',
      'items.original_subtotal',
      'items.original_tax_total',
      'items.original_total',
      'items.discount_total',
      'items.discount_tax_total',
      'summary.*',
    ],
    filters: { id: data.id },
  });

  const {
    data: [customer],
  } = await query.graph({
    entity: 'customer',
    fields: ['id', 'email', 'first_name', 'last_name'],
    filters: { id: order.customer_id },
  });

  // In your subscriber
await notificationModuleService.createNotifications({
  to: 'oumarubah12345@gmail.com',
  channel: 'email',
  template: 'order-placed',
  data: { 
    order: {
      id: order.id,
      total: order.total?.toString(), // Convert numbers to strings
      currency_code: order.currency_code,
      email: order.email,
      // Only include the specific fields you need
      shipping_address: order.shipping_address,
      billing_address: order.billing_address,
      items: order.items?.map(item => ({
        title: item.title,
        quantity: item.quantity?.toString(),
        total: item.total?.toString(),
        // Include only what you need, convert numbers to strings
      }))
    },
    customer: {
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
    }
  },
});
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
