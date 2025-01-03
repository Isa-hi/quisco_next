import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // Ensure params is a promise
}) {
  const { id } = await params; // Await the params
  const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
      where: {
        id: +id,
      },
    });
    if (!product) {
      notFound();
    }
    return product;
  };
  const product = await getProductById(id);
  return (
    <div>
      <Heading> Editar Producto {product.name} </Heading>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </div>
  );
}
