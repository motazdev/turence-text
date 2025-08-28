"use client";
import { emptyCategories, tshirt } from "@/assets";
import AppContainer from "@/components/AppContainer";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import PaginationLinks01 from "@/components/ui/pagination-links-01";
import { Skeleton } from "@/components/ui/skeleton";
import categoryService from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { data: categories, isLoading } = useQuery({
    queryKey: ["all-categories", page],
    queryFn: () => categoryService.getAllCategories(Number(page)),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const isEmpty =
    !isLoading && categories && categories?.data.data.length === 0;
  return (
    <div>
      <PageHeader text={"Our Categories"} />
      <AppContainer>
        <AppBreadCrumb
          steps={[
            { text: "Home", href: "/" },
            { text: "Our Categories", href: "/categories" },
          ]}
        />
        <div className="mt-10">
          {isEmpty && (
            <div className="flex py-32 justify-center gap-y-6 flex-col items-center">
              <div className="relative size-32">
                <Image
                  src={emptyCategories}
                  alt="NoCategories"
                  className="absolute inset-0 object-cover"
                />
              </div>
              <p className="text-center max-w-xs md:text-base text-sm">
                {t("There are no Categories yet")}
              </p>
            </div>
          )}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-x-4 md:gap-y-8 gap-y-8">
              {Array.from({ length: 20 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="size-36 relative lg:size-40  rounded-full md:rounded-full"
                />
              ))}
            </div>
          )}
          {!isEmpty && categories && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-x-4 md:gap-y-8 gap-y-8">
                {categories.data.data.map((category, i) => (
                  <Link
                    href={`/categories/${category.id}`}
                    key={i}
                    className="flex justify-center flex-col items-center gap-y-2"
                  >
                    <div className="rounded-full flex justify-center items-center bg-[#E6E6E64D] size-40 p-6">
                      <div className="relative size-44">
                        <Image
                          src={category.image}
                          alt="category"
                          fill
                          className="rounded-full absolute object-contain"
                        />
                      </div>
                    </div>

                    <h6 className="font-medium line-clamp-2 text-center">
                      {category.name}
                    </h6>
                  </Link>
                ))}
              </div>
              {categories.data.meta.last_page > 1 && (
                <div className=" mt-12">
                  <PaginationLinks01
                    currentPage={Number(page)}
                    totalPages={categories.data.meta.last_page}
                    paginationItemsToDisplay={4}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </AppContainer>
    </div>
  );
};

export default Page;
