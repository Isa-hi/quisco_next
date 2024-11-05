import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const products = await getProducts((await params).category);

  return (
    <>
    <Heading>Elige y personaliza tu pedido</Heading>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
