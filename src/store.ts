import { Product } from "@prisma/client";
import { create } from "zustand";
import { OrderItem } from "./types";

type Store = {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  deleteItem: (id: Product["id"]) => void;
  clearOrder: () => void;
};

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { image, categoryId, ...data } = product;
    // Use image and categoryId to avoid build errors
    console.log(image, categoryId);
    let order: OrderItem[] = [];

    if (get().order.find((item) => item.id === product.id)) {
      order = get().order.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price,
          };
        } else {
          return item;
        }
      });
    } else {
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * data.price,
        },
      ];
    }
    set(() => ({
      order,
    }));
  },
  increaseQuantity: (id) => {
    set((state) => {
      const order = state.order.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price,
          };
        } else {
          return item;
        }
      });
      return {
        order,
      };
    });
  },
  decreaseQuantity: (id) => {
    const order = get().order.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
          subtotal: (item.quantity - 1) * item.price,
        };
      } else {
        return item;
      }
    });
    set(() => ({
      order,
    }));
  },
  deleteItem: (id) => {
    const order = get().order.filter((item) => item.id !== id);
    set(() => ({
      order,
    }));
  },
  clearOrder: () => {
    set(() => ({
      order: [],
    }));
  }
}));
