import { defineMiddlewares } from "@medusajs/framework/http";

// Middleware to convert full_name into first_name + last_name
function handleFullName(req: any, res: any, next: any) {
  const addr = req.body.shipping_address;
  if (addr?.full_name) {
    const [first, ...rest] = addr.full_name.split(" ");
    addr.first_name = first;
    addr.last_name = rest.join(" ") || "";
    delete addr.full_name;
  }
  next();
}


export default defineMiddlewares({
  routes: [
    {
      method: ["POST"],
      matcher: "/store/carts",      // Create cart
      middlewares: [handleFullName],
    },
    {
      method: ["POST"],
      matcher: "/store/carts/*",    // Update cart by ID
      middlewares: [handleFullName],
    },
  ],
});










