"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function completeOrder(formData: FormData) {
  const order_id = formData.get("order_id")!;
  const result = OrderIdSchema.safeParse({ order_id });
  if (result.success) {
    await prisma.order.update({
      where: {
        id: result.data.order_id,
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });
    revalidatePath("/admin/orders");
  }
}
