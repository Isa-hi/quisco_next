import { OrderWithProducts } from "@/src/types";

type LastestOrderItemProps = {
  order: OrderWithProducts;
};
export default function LastestOrderItem({ order }: LastestOrderItemProps) {
  return (
    <div className="bg-white shadow p-5 space-y-5 rounded-lg">
      <p className="text-lg font-bold text-slate-600">Cliente: {order.name}</p>

      <ul className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
        {order.orderProducts.map((orderProduct) => (
          <li key={orderProduct.id} className="flex py-2">
            <span>
              ({orderProduct.quantity}) {orderProduct.product.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
