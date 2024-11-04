import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  total: z.number().min(1, "El total es requerido"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});

export const OrderIdSchema = z.object({
  order_id: z.string().transform((val) => parseInt(val)).refine(val => val > 0, "Hay errores"),
});

export const SearchSchema = z.object({
  search: z.string().trim().min(1, "La búsqueda no puede estar vacía"),
});