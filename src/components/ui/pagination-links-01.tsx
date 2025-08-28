import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
};

export default function PaginationLinks01({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });
  const t = useTranslations();
  return (
    <div className="w-full">
      {/* Mobile pagination - simplified view */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-2">
          <PaginationLink
            className="aria-disabled:pointer-events-none border border-input aria-disabled:opacity-50 h-8 w-8 p-0"
            href={currentPage === 1 ? undefined : `?page=${currentPage - 1}`}
            aria-label="Go to previous page"
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "link" : undefined}
          >
            <ChevronLeftIcon
              className="rtl:rotate-180"
              size={16}
              aria-hidden="true"
            />
          </PaginationLink>

          <div className="flex items-center gap-1 px-3 py-1 text-sm">
            <span className="font-medium">{currentPage}</span>
            <span className="text-muted-foreground">{t("of")}</span>
            <span className="font-medium">{totalPages}</span>
          </div>

          <PaginationLink
            className="aria-disabled:pointer-events-none border border-input aria-disabled:opacity-50 h-8 w-8 p-0"
            href={
              currentPage === totalPages
                ? undefined
                : `?page=${currentPage + 1}`
            }
            aria-label="Go to next page"
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "link" : undefined}
          >
            <ChevronRightIcon
              className="rtl:rotate-180"
              size={16}
              aria-hidden="true"
            />
          </PaginationLink>
        </div>
      </div>

      {/* Desktop pagination - full view */}
      <Pagination className="hidden sm:flex">
        <PaginationContent>
          {/* First page button */}
          <PaginationItem>
            <PaginationLink
              className="aria-disabled:pointer-events-none border border-input aria-disabled:opacity-50"
              href={currentPage === 1 ? undefined : `?page=1`}
              aria-label="Go to first page"
              aria-disabled={currentPage === 1 ? true : undefined}
              role={currentPage === 1 ? "link" : undefined}
            >
              <ChevronsLeft
                className="rtl:rotate-180"
                size={16}
                aria-hidden="true"
              />
            </PaginationLink>
          </PaginationItem>

          {/* Previous page button */}
          <PaginationItem>
            <PaginationLink
              className="aria-disabled:pointer-events-none border border-input aria-disabled:opacity-50"
              href={currentPage === 1 ? undefined : `?page=${currentPage - 1}`}
              aria-label="Go to previous page"
              aria-disabled={currentPage === 1 ? true : undefined}
              role={currentPage === 1 ? "link" : undefined}
            >
              <ChevronLeftIcon
                className="rtl:rotate-180"
                size={16}
                aria-hidden="true"
              />
            </PaginationLink>
          </PaginationItem>

          {/* Left ellipsis (...) */}
          {showLeftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Page number links */}
          {pages.map((page) => {
            if (page !== totalPages) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    className={cn(
                      "border border-input",
                      page === currentPage &&
                        "border border-[#404040] text-[#404040] rounded-lg"
                    )}
                    href={`?page=${page}`}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          {/* Right ellipsis (...) */}
          {showRightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last page link */}
          <PaginationItem>
            <PaginationLink
              className={cn(
                "border border-input rounded-lg",
                totalPages === currentPage &&
                  "bg-main border border-main text-white"
              )}
              href={`?page=${totalPages}`}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>

          {/* Next page button */}
          <PaginationItem>
            <PaginationLink
              className="aria-disabled:pointer-events-none border border-input aria-disabled:opacity-50"
              href={
                currentPage === totalPages
                  ? undefined
                  : `?page=${currentPage + 1}`
              }
              aria-label="Go to next page"
              aria-disabled={currentPage === totalPages ? true : undefined}
              role={currentPage === totalPages ? "link" : undefined}
            >
              <ChevronRightIcon
                className="rtl:rotate-180"
                size={16}
                aria-hidden="true"
              />
            </PaginationLink>
          </PaginationItem>

          {/* Last page button */}
          <PaginationItem>
            <PaginationLink
              className="aria-disabled:pointer-events-none border border-input aria-disabled:opacity-50"
              href={
                currentPage === totalPages ? undefined : `?page=${totalPages}`
              }
              aria-label="Go to last page"
              aria-disabled={currentPage === totalPages ? true : undefined}
              role={currentPage === totalPages ? "link" : undefined}
            >
              <ChevronsRight
                className="rtl:rotate-180"
                size={16}
                aria-hidden="true"
              />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
