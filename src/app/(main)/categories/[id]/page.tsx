"use client";
import { dress, emptySingleCategory } from "@/assets";
import AppContainer from "@/components/AppContainer";
import Filters from "@/components/filters";
import TLAddToCart from "@/components/icons/tl-add-to-cart-icon";
import TLHeartIcon from "@/components/icons/tl-heart-icon";
import TLStarFill from "@/components/icons/tl-star-fill";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import ProductCard from "@/components/single-product/product-card";
import PaginationLinks01 from "@/components/ui/pagination-links-01";
import { Skeleton } from "@/components/ui/skeleton";
import productService from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const arr = new Array(12).fill("");
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [openMenu, setOpenMenu] = useState(false);
  const page = parseInt(searchParams.get("page") || "1");
  // const categoryId = searchParams.get("id") || "";
  const [maxRate, setMaxRate] = useState<number | undefined>(undefined);
  const [minRate, setMinRate] = useState<number | undefined>(undefined);
  const productType = searchParams.get("product_type") || "";
  const [pageNumber, setPage] = useState(1);
  const { id: categoryId } = use(params);
  useEffect(() => {
    setPage(1);
  }, [categoryId]);
  const [formattedAttrs, setFormattedAttrs] = useState<
    { id: number; value: string }[]
  >([]);
  const [formattedRateAttrs, setFormattedRateAttrs] = useState<
    { id: number; value: string }[]
  >([]);
  useEffect(() => {
    const attrs: { id: number; value: string }[] = [];

    searchParams.forEach((value, key) => {
      if (
        key !== "id" &&
        key !== "page" &&
        key !== "product_type" &&
        key !== "max_rate" &&
        key !== "min_rate"
      ) {
        const matchingAttr = filtersData?.data.attributes.find(
          (attr) => attr.name === key
        );
        const id = matchingAttr?.id || 1;
        value.split(",").forEach((val) => {
          attrs.push({ id, value: val });
        });
      }
    });
    setFormattedAttrs(attrs);

    /////
    const attrsRates: { id: number; value: string }[] = [];

    searchParams.forEach((value, key) => {
      if (key === "max_rate" || key === "min_rate") {
        const id = parseInt(key.replace(/\D/g, ""), 10) || 1;
        value.split(",").forEach((val) => {
          attrsRates.push({ id, value: val });
        });
      }
    });
    setFormattedRateAttrs(attrsRates);
  }, [searchParams]);
  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      categoryId,
      searchParams,
      parseInt(categoryId),
      pageNumber,
      page,
      formattedAttrs,
      formattedRateAttrs,
      productType,
    ],
    queryFn: () =>
      productService.getProducts(
        {
          max_rate: maxRate,
          min_rate: minRate,
          categories_ids: [parseInt(categoryId)],
          attributres_product: formattedAttrs,
        },
        page
      ),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const categoryName = data?.data.products.data[0]?.categories.find(
    (item) => item.id === parseInt(categoryId)
  )?.name;

  const { data: filtersData, isLoading: isLoadingFilters } = useQuery({
    queryKey: ["prod_attr"],
    queryFn: () => productService.getProductsFilters(),
    staleTime: 1000 * 60 * 60,
  });
  const [isClearing, setIsClearing] = useState(false);
  const [initialCheckedValues, setInitialCheckedValues] = useState<string[]>(
    []
  );
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const clearAllFilters = () => {
    setIsClearing(true);
    setInitialCheckedValues([]);
    setCheckedValues([]);
    setMaxRate(undefined);
    setMinRate(undefined);
    setFormattedAttrs([]);
    const queryString = `?id=${categoryId}`;

    setFormattedAttrs([]);
    router.replace(`${pathname}${queryString}`, { scroll: false });
  };
  return (
    <div>
      <PageHeader text={""} translated={categoryName} />
      <AppContainer>
        <AppBreadCrumb
          steps={[
            { text: "Home", href: "/" },
            { text: "Our Categories", href: "/categories" },
            { translated: categoryName },
          ]}
        />
        <div className="mt-10">
          <div className="flex flex-col gap-y-4">
            <Filters
              categoryId={categoryId}
              data={data}
              setMaxRate={setMaxRate}
              setMinRate={setMinRate}
              isLoading={isLoadingFilters}
              checkedValues={checkedValues}
              setCheckedValues={setCheckedValues}
              setInitialCheckedValues={setInitialCheckedValues}
              isClearing={isClearing}
              initialCheckedValues={initialCheckedValues}
              filtersData={filtersData?.data.attributes}
              setFormattedAttrs={setFormattedAttrs}
              setFormattedRateAttrs={setFormattedRateAttrs}
              clearAllFilters={clearAllFilters}
            />
            <hr />
            {data && data.data.products.data.length === 0 ? (
              <div className="flex py-32 justify-center gap-y-6 flex-col items-center">
                <div className="relative size-32">
                  <Image
                    src={emptySingleCategory}
                    alt="NoCategories"
                    className="absolute inset-0 object-cover"
                  />
                </div>
                <p className="text-center font-medium max-w-xs md:text-base text-sm">
                  {t("no products")}
                </p>
              </div>
            ) : (
              <>
                {isLoading && (
                  <div className="grid md:grid-cols-4 gap-5 w-auto  sm:grid-cols-2 grid-cols-2">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="flex flex-col">
                        <Skeleton className="w-full h-[178px] md:h-[256px] 2xl:h-[256px]" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid md:grid-cols-4 gap-5 w-auto  sm:grid-cols-2 grid-cols-2">
                  {data?.data.products.data.map((product, i) => (
                    <ProductCard product={product} key={i} />
                  ))}
                </div>
                {!!data?.data.products.meta.last_page &&
                  data?.data.products.meta.last_page > 1 && (
                    <div className=" mt-12">
                      <PaginationLinks01
                        currentPage={page}
                        totalPages={data?.data.products.meta.last_page || 1}
                        paginationItemsToDisplay={4}
                      />
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default Page;
