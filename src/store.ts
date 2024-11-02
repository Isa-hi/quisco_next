import { Product } from "@prisma/client";
import { create } from "zustand";
import { OrderItem } from "./types";

type Store = {
    order: OrderItem[];
    addToOrder: (product: Product) => void;
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const { image, categoryId, ...data} = product;
        let order : OrderItem[] = [];

        if(get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => {
                if(item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: (item.quantity + 1) * item.price
                    }
                } else {
                    return item;
                }
            });
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * data.price,
            }]
        }

        set((state) => ({
            order
        }));
    }
}));