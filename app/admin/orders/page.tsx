import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import React from "react";

const getPendingOrders = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      }
    }
  });
  return orders;
};

export default async function OrderPage() {
  const orders = await getPendingOrders();
  console.log(orders);
  return (
    <>
      <Heading>Administra las ordenes</Heading>
      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )  : (
        <p>No hay ordenes pendientes</p>
      )}
    </>
  );
}