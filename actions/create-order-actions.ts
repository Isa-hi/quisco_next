 "use server"

import { OrderSchema } from "@/src/schema"
import { prisma } from "@/src/lib/prisma";

 export async function createOrder(data: unknown) {
    const result = await OrderSchema.safeParse(data);
    if(!result.success){
      return { errors: result.error.issues }
    }
    const { name, total, order } = result.data;
    await prisma.order.create({
      data: {
        name,
        total,
        orderProducts: {
          create: order.map((product ) => ({
            productId: product.id,
            quantity: product.quantity,
          }))
        }
      }
    });
    return { result: result.data }
 }