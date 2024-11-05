"use client"
import LastestOrderItem from "@/components/order/LastestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function page() {
  const url = "/orders/api";
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: orders,
    isLoading,
    error,
  } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  if (isLoading) return <p>Cargando...</p>;
  if (orders)
    return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">
          Ordenes listas
        </h1>
        <Logo />

        {orders.length ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mt-10">
            {orders.map((order) => (
              <LastestOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No hay ordenes listas</p>
        )}
      </>
    );
}
