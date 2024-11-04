import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

type SearchPageProps = {
  searchParams: {
    search: string;
  };
};

async function productsSearch(searched: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searched,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchedWord = searchParams.search;
  const searchedProducts = await productsSearch(searchedWord);

  return (
    <>
      <Heading>Resultados de búsqueda : {searchedWord} </Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductSearchForm />
      </div>
      {searchedProducts.length ? (
        <ProductTable products={searchedProducts} />
      ) : (
        <p>No se encontraron productos</p>
      )}
    </>
  );
}
