"use client";
import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";

export default function OrderPage() {
  const url = "/admin/orders/api";
  const fetcher = (url : string) => fetch(url).then((res) => res.json());
  const { data: orders, isLoading, error } = useSWR<OrderWithProducts[]>(url, fetcher, { refreshInterval: 60000 });

  const refreshOrders = () => {
    window.location.reload();
  };
  if(orders) return (
    <>
      <Heading>Administra las ordenes</Heading>
      <form action={refreshOrders}>
        <input
          type="submit"
          value="Actualizar ordenes"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        />
      </form>
      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>No hay ordenes pendientes</p>
      )}
    </>
  );
}
