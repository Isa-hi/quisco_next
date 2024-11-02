"use client";
import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const { addToOrder } = useStore();
  return (
    <button
      type="button"
      className="bg-cyan-600 hover:bg-cyan-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      onClick={() =>
        addToOrder(product)
      }
    >
      Agregar
    </button>
  );
}
