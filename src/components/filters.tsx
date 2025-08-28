"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import MultipleSelector01 from "./ui/multi-select-01";
import { useTranslations } from "next-intl";
import {
  IPaginatedProductsResponse,
  IProduct,
  IProductAttribute,
} from "@/utils/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filters = ({
  checkedValues,
  clearAllFilters,
  data,
  filtersData,
  initialCheckedValues,
  isClearing,
  isLoading,
  setCheckedValues,
  setFormattedAttrs,
  setInitialCheckedValues,
  setFormattedRateAttrs,
  categoryId,
  setMaxRate,
  setMinRate,
}: {
  setMaxRate: Dispatch<SetStateAction<number | undefined>>;
  setMinRate: Dispatch<SetStateAction<number | undefined>>;
  setFormattedRateAttrs: Dispatch<
    SetStateAction<
      {
        id: number;
        value: string;
      }[]
    >
  >;
  categoryId?: string;
  filtersData: IProductAttribute[] | undefined;
  setFormattedAttrs: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        value: string;
      }[]
    >
  >;
  checkedValues: string[];
  initialCheckedValues: string[];
  isClearing: boolean;
  setCheckedValues: Dispatch<SetStateAction<string[]>>;
  setInitialCheckedValues: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  clearAllFilters: () => void;
  data: IPaginatedProductsResponse<IProduct[]> | undefined;
}) => {
  const OPTIONS = [
    { label: "From 1 to 2", value: "1", min_rate: 1, max_rate: 2 },
    { label: "From 2 to 3", value: "2", min_rate: 2, max_rate: 3 },
    { label: "From 3 to 4", value: "3", min_rate: 3, max_rate: 4 },
    { label: "From 4 to 5", value: "4", min_rate: 4, max_rate: 5 },
  ];
  const t = useTranslations();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const router = useRouter();
  const pathname = usePathname();

  // Add useTransition hook
  const [isPending, startTransition] = useTransition();

  const [defaultOpenItems, setDefaultOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedValues: string[] = [];
    const initialFormattedAttributes: { id: number; value: string }[] = [];
    const openItems: Record<number, boolean> = {};
    const productTypeParam = params.getAll("product_type");
    if (productTypeParam.length > 0) {
      selectedValues.push(productTypeParam[0]);
      openItems[74864851365] = true;
    }

    const minRate = params.get("min_rate");
    const maxRate = params.get("max_rate");
    if (minRate && maxRate) {
      const minRateNum = parseInt(minRate);
      const maxRateNum = parseInt(maxRate);
      // Add all rating values within the range
      for (let rate = minRateNum; rate <= maxRateNum; rate++) {
        if (OPTIONS.find((opt) => parseInt(opt.value) === rate)) {
          selectedValues.push(rate.toString());
        }
      }
    }

    if (filtersData) {
      filtersData.forEach((attr: IProductAttribute) => {
        if (attr.display_format.toLowerCase()) {
          const paramValues = params.getAll(attr.name);
          paramValues.forEach((value) => {
            if (
              attr.values.map((v) => v.name).includes(value) &&
              !selectedValues.includes(value)
            ) {
              selectedValues.push(value);
              initialFormattedAttributes.push({ id: attr.id, value });

              openItems[attr.id] = true;
            }
          });
        }
      });
    }

    if (isClearing) return;
    setCheckedValues(selectedValues);
    setInitialCheckedValues(selectedValues);
    if (selectedValues.length > 0) {
      setFormattedAttrs(initialFormattedAttributes);
    }
  }, [searchParams, filtersData]);

  const applySpecifications = () => {
    if (checkedValues.length > 0) {
      const formattedAttributes: { id: number; value: string }[] = [];

      filtersData?.forEach((attr) => {
        const selectedValues = checkedValues.filter((value) =>
          attr.values.map((v) => v.name).includes(value)
        );
        selectedValues.forEach((value: string) => {
          formattedAttributes.push({
            id: attr.id,
            value: value,
          });
        });
      });

      setFormattedAttrs(formattedAttributes);

      let queryString = categoryId ? `?id=${categoryId}` : "?type=all";
      checkedValues.forEach((value: string) => {
        filtersData?.forEach((attr) => {
          if (attr.values.map((v) => v.name).includes(value)) {
            queryString += `&${attr.name}=${value}`;
          }
        });
      });

      startTransition(() => {
        router.replace(`${pathname}${queryString}`, { scroll: false });
      });
    } else {
      const queryString = categoryId ? `?id=${categoryId}` : "?type=all";
      setFormattedAttrs([]);

      startTransition(() => {
        router.replace(`${pathname}${queryString}`, { scroll: false });
      });
    }
  };

  const [disabledApplySpecs, setDisabledApplySpecs] = useState(true);

  useEffect(() => {
    const hasChanges =
      JSON.stringify(initialCheckedValues.sort()) !==
      JSON.stringify(checkedValues.sort());
    setDisabledApplySpecs(!hasChanges);
  }, [initialCheckedValues, checkedValues]);

  // Separate the navigation logic from state updates
  const applySpecificationsWithValues = (values: string[]) => {
    if (values.length > 0) {
      const formattedAttributes: { id: number; value: string }[] = [];

      filtersData?.forEach((attr) => {
        const selectedValues = values.filter((value) =>
          attr.values.map((v) => v.name).includes(value)
        );
        selectedValues.forEach((value: string) => {
          formattedAttributes.push({
            id: attr.id,
            value: value,
          });
        });
      });
      setFormattedAttrs(formattedAttributes);

      let queryString = categoryId ? `?id=${categoryId}` : "?type=all";
      values.forEach((value: string) => {
        filtersData?.forEach((attr) => {
          if (attr.values.map((v) => v.name).includes(value)) {
            queryString += `&${attr.name}=${value}`;
          }
        });
      });

      // Wrap navigation in startTransition
      startTransition(() => {
        router.replace(`${pathname}${queryString}`, { scroll: false });
      });
    } else {
      const queryString = categoryId ? `?id=${categoryId}` : "?type=all";
      setFormattedAttrs([]);

      startTransition(() => {
        router.replace(`${pathname}${queryString}`, { scroll: false });
      });
    }
  };

  const handleFilterChange = (
    selectedOptions: { label?: string; name?: string; value: string }[],
    filterId: number
  ) => {
    const newValues = selectedOptions.map((opt) => opt.value);

    setCheckedValues((prev) => {
      const currentFilter = filtersData?.find((f) => f.id === filterId);

      if (!currentFilter) return prev;

      const prevWithoutCurrent = prev.filter(
        (val) => !currentFilter.values.map((v) => v.name).includes(val)
      );

      const updatedValues = [...prevWithoutCurrent, ...newValues];

      // Use useEffect to handle navigation after state update
      setTimeout(() => {
        applySpecificationsWithValues(updatedValues);
      }, 0);

      return updatedValues;
    });

    setDisabledApplySpecs(false);
  };

  const handleRatingChange = (selectedOptions: any[]) => {
    const newRatingObjects = selectedOptions.map((opt) => ({
      max_rate: opt.max_rate,
      min_rate: opt.min_rate,
      value: opt.value,
    }));
    const newValues = selectedOptions.map((opt) => opt.value);
    const ratingOptions = OPTIONS.map((opt) => opt.value);

    setCheckedValues((prev) => {
      const prevWithoutRating = prev.filter(
        (val) => !ratingOptions.includes(val)
      );

      const updatedValues = [...prevWithoutRating, ...newValues];

      // Use setTimeout to defer the navigation
      setTimeout(() => {
        applySpecificationsWithRating(
          updatedValues,
          selectedOptions,
          newRatingObjects
        );
      }, 0);

      return updatedValues;
    });

    setDisabledApplySpecs(false);
  };

  const applySpecificationsWithRating = (
    values: string[],
    selectedRatingOptions: any[],
    ratingObjects: Array<{ max_rate: number; min_rate: number; value: string }>
  ) => {
    const formattedAttributes: { id: number; value: string }[] = [];
    const ratingOptions = OPTIONS.map((opt) => opt.value);

    const nonRatingValues = values.filter(
      (value) => typeof value === "string" && !ratingOptions.includes(value)
    );

    filtersData?.forEach((attr) => {
      const selectedValues = nonRatingValues.filter((value) =>
        attr.values.map((v) => v.name).includes(value)
      );
      selectedValues.forEach((value: string) => {
        formattedAttributes.push({
          id: attr.id,
          value: value,
        });
      });
    });

    setFormattedAttrs(formattedAttributes);

    let queryString = categoryId ? `?id=${categoryId}` : "?type=all";

    nonRatingValues.forEach((value: string) => {
      filtersData?.forEach((attr) => {
        if (attr.values.map((v) => v.name).includes(value)) {
          queryString += `&${attr.name}=${value}`;
        }
      });
    });

    if (selectedRatingOptions.length > 0) {
      const minRates = selectedRatingOptions.map((opt) => opt.min_rate);
      const maxRates = selectedRatingOptions.map((opt) => opt.max_rate);
      const minRate = Math.min(...minRates);
      const maxRate = Math.max(...maxRates);
      setMaxRate(maxRate);
      setMinRate(minRate);

      queryString += `&min_rate=${minRate}&max_rate=${maxRate}`;
    }

    // Wrap navigation in startTransition
    startTransition(() => {
      router.replace(`${pathname}${queryString}`, { scroll: false });
    });
  };

  return (
    <>
      {!isLoading && filtersData && filtersData?.length > 0 && (
        <div className="flex flex-row gap-x-3 items-center">
          <h2 className="text-base font-semibold">{t("Filter Option")}</h2>
          {checkedValues.length > 0 && (
            <span
              onClick={() => clearAllFilters()}
              className="text-main cursor-pointer underline text-sm"
            >
              {t("Clear All")}
            </span>
          )}
        </div>
      )}

      <div className="flex lg:flex-row w-full flex-col gap-y-6 items-center justify-center lg:justify-start flex-wrap gap-x-4">
        {filtersData?.map((filter) => (
          <div key={filter.id} className="group w-full lg:w-fit relative">
            <label
              htmlFor={filter.id.toString()}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              {filter.name} - {filter.id}
            </label>
            <MultipleSelector01
              onChange={(selectedOptions) =>
                handleFilterChange(selectedOptions, filter.id)
              }
              hidePlaceholderWhenSelected
              className="lg:max-w-[300px] w-full"
              defaultOptions={filter.values.map((v) => ({
                label: v.name,
                value: v.name || "",
                name: v.name || "",
              }))}
              value={checkedValues
                .filter((value) =>
                  filter.values.map((v) => v.name).includes(value)
                )
                .map((value) => ({
                  label: value,
                  value: value,
                  name: value,
                }))}
              placeholder={`${t("select") + " " + filter.name} `}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </div>
        ))}
        {!isLoading && (
          <div className="group relative lg:w-fit w-full">
            <label
              htmlFor="rating"
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              {t("Ratings")}
            </label>
            <MultipleSelector01
              onChange={handleRatingChange}
              hidePlaceholderWhenSelected
              className="lg:max-w-[300px] w-full"
              defaultOptions={OPTIONS.map((opt) => ({
                label: opt.label,
                value: opt.value,
                min_rate: opt.min_rate.toString(),
                max_rate: opt.max_rate.toString(),
              }))}
              placeholder={`${t("select") + " " + t("rate")} `}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Filters;
