import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import EmailService from "../services/email-service.js"
import { EmailTemplates } from "../modules/email-notifications/templates"
import { INotificationModuleService, IOrderModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {


  const logger = container.resolve("logger")

  const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION) //notification 
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)

  const order = await orderModuleService.retrieveOrder(data.id, { relations: ['items', 'summary', 'shipping_address'] })
  //const shippingAddress = await (orderModuleService as any).orderAddressService_.retrieve(order.shipping_address.id)


  logger.info("Order placed event received. Sending confirmation email...")


  if (!order) {
    logger.warn("Order customer email not found, skipping email")
    return
  }

  // Instantiate EmailService
  const emailService = new EmailService()

  console.log("order: ", order)
  const sendEmail = "oumarubah12345@gmail.com"
  try {
    await emailService.sendOrderConfirmation(sendEmail, order)
    logger.info(`Order confirmation email sent to ${sendEmail}`)
    // await notificationModuleService.createNotifications({
    //   to: sendEmail,
    //   template: EmailTemplates.ORDER_PLACED, // <-- use template
    //   channel: 'email',
    //   data: {
    //     emailOptions: {
    //       replyTo: 'support@timelib.com',
    //       subject: 'Your order has been placed'
    //     },
    //     order,
    //     shippingAddress,
    //     preview: 'Thank you for your order!'
    //   }
    // })
  } catch (error) {
    logger.error("Error sending order confirmation email:", error)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}


