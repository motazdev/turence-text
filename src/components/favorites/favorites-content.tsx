"use client";
import { emptyFavories } from "@/assets";
import { useProducts } from "@/contexts/products/products.context";
import productService from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ProductCard from "../single-product/product-card";
import PaginationLinks01 from "../ui/pagination-links-01";
import { useTranslations } from "next-intl";
import { Skeleton } from "../ui/skeleton";

const FavoritesContent = () => {
  const { favsProducts, setFavsProducts } = useProducts();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { data, isLoading } = useQuery({
    queryKey: ["favs-page", page],
    queryFn: () => productService.getProducts({ is_favorite: 1 }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data && !favsProducts && setFavsProducts) {
      setFavsProducts(data?.data.products.data);
    }
  }, [data]);
  return (
    <div className="mt-10">
      {isLoading && (
        <div className="grid md:grid-cols-4 gap-5 w-auto  sm:grid-cols-2 grid-cols-2">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="w-full md:h-72 sm:h-56 h-40 rounded-2xl "
            />
          ))}
        </div>
      )}
      {(!favsProducts || favsProducts?.length === 0) && !isLoading && (
        <div className="flex py-32 justify-center gap-y-6 flex-col items-center">
          <div className="relative size-32">
            <Image
              src={emptyFavories}
              alt="NoFavs"
              className="absolute inset-0 object-cover"
            />
          </div>
          <p className="text-center max-w-xs md:text-base text-sm">
            {t("no-favs")}
          </p>
        </div>
      )}
      {data && (
        <>
          {favsProducts && favsProducts?.length > 0 && (
            <>
              <div className="grid md:grid-cols-4 gap-5 w-auto  sm:grid-cols-2 grid-cols-2">
                {favsProducts.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))}
              </div>
              {data.data.products.meta.last_page > 1 && (
                <div className=" mt-12">
                  <PaginationLinks01
                    currentPage={data.data.products.meta.current_page}
                    totalPages={data.data.products.meta.last_page}
                    paginationItemsToDisplay={4}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesContent;
