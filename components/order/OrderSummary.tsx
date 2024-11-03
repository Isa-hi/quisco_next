"use client";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-actions";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const { order, clearOrder } = useStore();

  const handleCreateOrder = async (formData: FormData) => {
    const data = { name: formData.get("name"), total, order };
    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    const response = await createOrder(data);

    if (response.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    toast.success("Pedido creado correctamente");
    clearOrder();
  };

  const total = order.reduce((total, item) => total + item.subtotal, 0);

  return (
    <div className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center mt-10">El carrito está vacío</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a pagar:{" "}
            <span className="font-black">{formatCurrency(total)}</span>
          </p>

          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              className="py-2 px-3 border border-gray-300 rounded w-full"
            />

            <input
              type="submit"
              value="Confirmar pedido"
              className="py-2 rounded uppercase text-white bg-black hover:bg-blue-800 font-semibold w-full text-center cursor-pointer"
            />
          </form>
        </div>
      )}
    </div>
  );
}
