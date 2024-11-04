"use server"

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function updateProduct(data: unknown, id: number) {
    console.log(data);
    console.log(id);
    const result = await ProductSchema.safeParse(data);
    console.log(result);
    
    if(!result.success){
        return { errors: result.error.issues }
    }
    await prisma.product.update({
        where: {
            id
        },
        data: result.data
    });
    return { result: result.data }
}
