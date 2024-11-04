"use client";

import { updateProduct } from "@/actions/update-order-actions";
import { ProductSchema } from "@/src/schema";
import { redirect, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = +params.id!;
  
  const handleEditProduct = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };
    console.log(data);
    
    const result = ProductSchema.safeParse(data);
    console.log(result);
    
    if (!result.success) {
      result.error.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
    const response = await updateProduct(data, id);
    if (response.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message);
      });
    } else {
      toast.success("Producto actualizado correctamente");
      redirect("/admin/products");
    }
  };
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleEditProduct} className="space-y-5">
        {children}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value={"Guardar cambios"}
        />
      </form>
    </div>
  );
}
