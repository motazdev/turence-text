"use client";
import cartService from "@/services/cart";
import productService from "@/services/product";
import useCartStore from "@/store/cart";
import {
  IProduct,
  IProductAttrCombinationAttribute,
  IProductDetailsResponse,
} from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TLAddToCart from "../icons/tl-add-to-cart-icon";
import TLHeartIcon from "../icons/tl-heart-icon";
import TLShoppingBag from "../icons/tl-shopping-bag-icon";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import SelectMenu01 from "../ui/select-menu-01";
import Stepper02 from "../ui/stepper-02";
import LoadingSpinner from "../shared/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/contexts/auth/auth.context";
import { useGlobalAppData } from "@/contexts/global/global.context";
import { useProducts } from "@/contexts/products/products.context";
import TLRemoveCart from "../icons/tl-remove-cart-icon";
import TLHeartFillIcon from "../icons/tl-heart-fill-icon";
import { Skeleton } from "../ui/skeleton";

const ProductSideInfo = ({
  data: productDetails,
}: {
  data: IProductDetailsResponse;
}) => {
  const [count, setCount] = useState(1);

  const t = useTranslations();
  const [attributresProduct, setAttributresProduct] = useState<
    IProductAttrCombinationAttribute[]
  >(
    productDetails?.attributes
      ?.filter(
        (attr) =>
          Array.isArray(productDetails?.first_attribute?.values) &&
          attr.values.some((val) =>
            productDetails?.first_attribute.values.includes(val.name || "")
          )
      )
      .map((attr) => ({
        id: attr.id,
        value:
          productDetails?.first_attribute?.values?.find((val) =>
            attr.values.some((v) => v.name === val)
          ) || "",
      })) || []
  );

  const { data: productAttrs, isLoading: isLoadingAttrs } = useQuery({
    queryKey: ["change-attribute", attributresProduct],
    queryFn: () =>
      productService.getProductAttrCombination({
        product_id: productDetails?.product_details.id || 0,
        attributres_product: attributresProduct ?? [],
      }),
    enabled: (attributresProduct && attributresProduct.length > 0) || false,
    staleTime: 1000 * 60 * 60,
  });
  const isOutOfStock =
    productDetails?.attributes.length === 0
      ? productDetails?.product_details.stock === 0 ||
        !productDetails?.product_details.stock
      : productAttrs &&
        (productAttrs.data.stock === 0 || !productAttrs.data.stock);

  const handleAttributeChange = (attributeId: string, value: string) => {
    const id = parseInt(attributeId);

    if (attributresProduct.length === 0) {
      setAttributresProduct(
        productDetails?.attributes
          ?.filter(
            (attr) =>
              Array.isArray(productDetails?.first_attribute?.values) &&
              attr.values.some((val) =>
                productDetails?.first_attribute.values.includes(val.name || "")
              )
          )
          .map((attr) => ({
            id: attr.id,
            value:
              productDetails?.first_attribute?.values?.find((val) =>
                attr.values.some((v) => v.name === val)
              ) || "",
          })) || []
      );
    } else {
      setAttributresProduct((prev) =>
        prev.map((prevItem) =>
          prevItem.id === parseInt(attributeId)
            ? { ...prevItem, value: value }
            : prevItem
        )
      );
    }
  };
  const {
    cart,
    removeFromCart,
    setFavsProducts,
    addToCart: handleAddToCart,
  } = useProducts();
  const { setFeatProducts, favorites, toggleFavorite, setFavorites } =
    useGlobalAppData();
  const { setCart, cart: cartStore } = useCartStore();
  const { mutate: addToCart, isPending } = useMutation({
    mutationKey: ["addToCart", productDetails?.product_details.id],
    mutationFn: () => {
      if (productDetails && productAttrs?.data.id) {
        return cartService.addCartItem({
          product_id: productDetails?.product_details.id || 0,
          product_combination_id: productAttrs?.data.id,
          qty: count,
        });
      }

      return cartService.addCartItem({
        product_id: productDetails?.product_details.id || 0,
        product_combination_id: productDetails?.first_attribute.id,
        qty: count,
      });
    },
    onSuccess: (data) => {
      handleAddToCart(
        productDetails.product_details.id.toString(),
        productDetails.product_details.cart_item_id?.toString()
      );
      toast.success(data.message);
      setCart(data.data);
      setCount(1);
    },
    onError: (err) => {
      toast.error(err.message);
      setCount(1);
    },
  });
  const { mutate: deleteCartItem, isPending: isPendingDeleteCartItem } =
    useMutation({
      mutationFn: () =>
        cartService.deleteCartItem(
          productDetails.product_details.cart_item_id
            ? Number(productDetails.product_details.cart_item_id)
            : Number(
                cartStore?.items.find(
                  (t) => t.product.id === productDetails.product_details.id
                )?.id
              )
        ),
      onSuccess: (data) => {
        toast.success(data.message);
        setFeatProducts(
          (prev) =>
            prev &&
            prev.map((prod) =>
              prod.id === data.data.id
                ? { ...prod, is_cart: !prod.is_cart }
                : prod
            )
        );
        setCart(data.data);
        if (productDetails.product_details.id) {
          removeFromCart(productDetails.product_details.id.toString());
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const { user } = useAuth();
  const { mutate: changeFavorite, isPending: isPendingChangeFavorite } =
    useMutation({
      mutationKey: ["toggleFavorite"],
      mutationFn: (data: { productId: number }) =>
        productService.toggleFavorite(data),
      onSuccess: (data) => {
        toast.success(data.message);
        if (data.data.product.is_favorite) {
          setFavsProducts((prev) => [
            ...(prev || []),
            productDetails.product_details as IProduct,
          ]);
        } else {
          setFavsProducts(
            (prev) =>
              prev &&
              prev?.filter(
                (fav) => fav.id !== productDetails.product_details.id
              )
          );
        }
        toggleFavorite(
          productDetails.product_details.id.toString(),
          data.data.product.is_favorite
        );
      },
      onError: (data) => {
        toast.error(data.message);
      },
    });
  useEffect(() => {
    if (
      productDetails.product_details.is_cart &&
      !cartStore?.items.find(
        (item) => item.product.id === productDetails.product_details.id
      )
    ) {
      handleAddToCart(
        productDetails.product_details.id.toString(),
        productDetails.product_details.cart_item_id
      );
    }
  }, [productDetails]);
  useEffect(() => {
    if (!productDetails) return;
    setFavorites((prevFavs) => {
      const updatedFavs =
        prevFavs && prevFavs.length > 0 ? [...prevFavs] : [...favorites];
      const exists = updatedFavs.some(
        (fav) => fav.productId === productDetails.product_details.id.toString()
      );
      if (!exists) {
        updatedFavs.push({
          productId: productDetails.product_details.id.toString(),
          is_favorite: productDetails.product_details.is_favorite,
        });
      }
      return updatedFavs;
    });
  }, [productDetails]);
  const isProductInCart = cart[productDetails.product_details.id] !== undefined;
  return (
    <div className="data lg:col-span-7 col-span-full gap-y-4 justify-start items-start flex flex-col">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row flex-wrap  gap-2 items-center text-xs">
          {productDetails.product_details.categories.length > 0 &&
            productDetails.product_details.categories.map((category) => (
              <div
                key={category.id}
                className="category border px-4 py-1 font-medium rounded-full"
              >
                {category.name}
              </div>
            ))}
        </div>
        <div className="flex text-main flex-row gap-1">
          {isProductInCart ? (
            <button
              onClick={() => deleteCartItem()}
              disabled={isPendingDeleteCartItem}
              className="border p-1 rounded-lg cursor-pointer"
            >
              {isPendingDeleteCartItem ? <LoadingSpinner /> : <TLRemoveCart />}
            </button>
          ) : (
            !isProductInCart && (
              <button
                onClick={() => addToCart()}
                disabled={isPending}
                className="border p-1 rounded-lg cursor-pointer"
              >
                {isPending ? <LoadingSpinner /> : <TLAddToCart />}
              </button>
            )
          )}

          {favorites.find(
            (f) => f.productId === productDetails.product_details.id.toString()
          )?.is_favorite === true ? (
            <button
              onClick={() =>
                changeFavorite({ productId: productDetails.product_details.id })
              }
              disabled={isPendingChangeFavorite}
              className="cursor-pointer"
            >
              {isPendingChangeFavorite ? (
                <LoadingSpinner className="size-8.5" />
              ) : (
                <div className="border p-1 rounded-lg">
                  <TLHeartFillIcon />
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={() =>
                changeFavorite({ productId: productDetails.product_details.id })
              }
              className="cursor-pointer"
              disabled={isPendingChangeFavorite}
            >
              {isPendingChangeFavorite ? (
                <LoadingSpinner className="size-8.5" />
              ) : (
                <div className="border text-main p-1 rounded-lg">
                  <TLHeartIcon />
                </div>
              )}
            </button>
          )}
        </div>
      </div>
      <h2 className="text-xl font-semibold max-w-md">
        {productDetails.product_details.name}
      </h2>
      {isLoadingAttrs && <Skeleton className="w-40 h-8 mb-1" />}
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1">
          {isOutOfStock && (
            <p className="font-semibold text-sm md:text-2xl">
              {productDetails?.product_details.price} {t("AED")}
            </p>
          )}
          {!isOutOfStock &&
            productDetails &&
            attributresProduct.length === 0 && (
              <p className="font-semibold text-sm md:text-2xl">
                {productDetails?.product_details.price} {t("AED")}
              </p>
            )}
          {!isOutOfStock &&
            productDetails &&
            attributresProduct.length > 0 &&
            productAttrs && (
              <p className="font-semibold text-sm md:text-2xl">
                {productAttrs.data.price} {t("AED")}
              </p>
            )}
          {productDetails.product_details.price_before_discount && (
            <h6 className="text-sm text-[#8A8A8A] line-through">
              {productDetails.product_details.price_before_discount}
            </h6>
          )}
        </div>
        <p className="text-[#333333] text-xs mt-1">
          {t("This price is exclusive of taxes")}
        </p>
        <p className="text-[#545454] text-sm font-medium mt-3">
          {productDetails.product_details.description}
        </p>
      </div>
      <hr className="w-full" />
      {isOutOfStock && (
        <div className="bg-red-100/60 mt-6 w-fit px-2 py-1 text-lg font-semibold rounded-md  text-[#D90202]">
          {t("out of stock")}
        </div>
      )}
      {productAttrs &&
        (productAttrs.data.stock !== 0 || !productAttrs.data.stock) && (
          <>
            {productDetails.attributes.map((attribute) => {
              if (attribute.display_format.toLowerCase() === "color") {
                return (
                  <div key={attribute.id} className="flex gap-y-2 flex-col">
                    <h6>{attribute.name}</h6>
                    <RadioGroup
                      disabled={isLoadingAttrs}
                      className="flex flex-row gap-3"
                      value={
                        attributresProduct.find(
                          (item) => item.id === attribute.id
                        )?.value ||
                        productDetails?.first_attribute.values[0] ||
                        attribute.values[0]?.name ||
                        ""
                      }
                      onValueChange={(value) => {
                        setAttributresProduct((prev) =>
                          prev.map((prevItem) =>
                            prevItem.id === attribute.id
                              ? { ...prevItem, value: value }
                              : prevItem
                          )
                        );
                      }}
                    >
                      {attribute.values.length > 0 &&
                        attribute.values.map((value) => (
                          <div
                            key={value?.hex}
                            className="flex flex-row justify-between items-center"
                          >
                            <label
                              htmlFor={`${attribute.id}-${value.name}`}
                              className="bg-[#F4F7F9] size-10 rounded-full z-10 has-data-[state=checked]:border-[black] border border-transparent has-data-[state=checked]:border  has-data-[state=checked]:scale-105  has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative cursor-pointer gap-3 p-2 text-center shadow-xs outline-none has-focus-visible:ring-[3px] transition-all duration-300 ease-in-out"
                            >
                              <div
                                style={{ backgroundColor: value.hex }}
                                className="rounded-full  w-[50%] h-[50%] z-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center m-auto"
                              ></div>
                              <RadioGroupItem
                                id={`${attribute.id}-${value.name}`}
                                value={value.name || ""}
                                className="sr-only"
                              />
                            </label>
                          </div>
                        ))}
                    </RadioGroup>
                  </div>
                );
              } else if (attribute.display_format.toLowerCase() === "select") {
                return (
                  <div key={attribute.id} className="flex mt-3 w-full flex-col">
                    <div className="group w-full  relative">
                      <label
                        htmlFor={attribute.id.toString()}
                        className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                      >
                        {attribute.name}
                      </label>

                      <Select
                        disabled={isLoadingAttrs}
                        onValueChange={(value) =>
                          // handleAttributeChange(attribute.id.toString(), value)
                          setAttributresProduct((prev) =>
                            prev.map((prevItem) =>
                              prevItem.id === attribute.id
                                ? { ...prevItem, value: value }
                                : prevItem
                            )
                          )
                        }
                        value={
                          attributresProduct.find(
                            (item) => item.id === attribute.id
                          )?.value || productDetails?.first_attribute.values[0]
                        }
                      >
                        <SelectTrigger className="lg:w-[50%] disabled:opacity-80 cursor-pointer w-full py-6 rounded-xl">
                          <SelectValue placeholder={t("select")} />
                        </SelectTrigger>
                        <SelectContent>
                          {attribute.values.map((value) => (
                            <SelectItem
                              key={value.name}
                              value={value?.name || ""}
                            >
                              {value.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                );
              }
            })}
          </>
        )}

      {!isOutOfStock && !isLoadingAttrs && (
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-row items-center gap-3">
            <h3 className="text-xl font-semibold">{t("Quantity")}</h3>
            <span>
              (
              {productDetails && attributresProduct.length === 0
                ? parseInt(productDetails.product_details.price)
                : parseInt(productAttrs?.data.price ?? "0")}{" "}
              {t("AED")} {t("for Piece")})
            </span>
          </div>
          <div className="flex gap-y-4 w-full items-center md:flex-row flex-col justify-center md:justify-between">
            <div className="flex gap-3 md:flex-row items-center justify-start w-full">
              <Stepper02 setStep={setCount} step={count} />
              <span>
                {productDetails && attributresProduct.length === 0
                  ? parseInt(productDetails.product_details.price) * count
                  : parseInt(productAttrs?.data.price ?? "0") * count}{" "}
                {t("AED")}
              </span>
            </div>
            <Button
              onClick={() => addToCart()}
              disabled={isPending}
              className="bg-main hover:shadow-lg transition-all md:w-[200px] w-full py-6 cursor-pointer hover:bg-main/80"
            >
              {isPending ? <LoadingSpinner /> : t("add to cart")}{" "}
              <TLShoppingBag />
            </Button>
          </div>
        </div>
      )}
      {isLoadingAttrs && (
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-row items-center gap-3">
            <h3 className="text-xl font-semibold">{t("Quantity")}</h3>
            <Skeleton className="w-32 h-4" />
          </div>
          <div className="flex gap-y-4 w-full items-center md:flex-row flex-col justify-center md:justify-between">
            <div className="flex gap-3 md:flex-row items-center justify-start w-full">
              <Skeleton className="w-32 h-11" />
            </div>
            <Skeleton className="w-70 h-12" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSideInfo;
