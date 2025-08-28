import { useGlobalAppData } from "@/contexts/global/global.context";
import { useProducts } from "@/contexts/products/products.context";
import cartService from "@/services/cart";
import productService from "@/services/product";
import useCartStore from "@/store/cart";
import { IProduct } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import TLAddToCart from "../icons/tl-add-to-cart-icon";
import TLHeartFillIcon from "../icons/tl-heart-fill-icon";
import TLHeartIcon from "../icons/tl-heart-icon";
import TLRemoveCart from "../icons/tl-remove-cart-icon";
import TLStarFill from "../icons/tl-star-fill";
import LoadingSpinner from "../shared/LoadingSpinner";

const ProductCard = ({ product }: { product: IProduct }) => {
  const t = useTranslations();

  const { addToCart, cart, removeFromCart, setFavsProducts } = useProducts();
  const { setFeatProducts, favorites, toggleFavorite, setFavorites } =
    useGlobalAppData();
  const { setCart, cart: cartStore } = useCartStore();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ productId, qty }: { productId: number; qty: number }) =>
      cartService.addCartItemFromAllProducts({
        productId: productId,
        qty,
      }),
    onSuccess: (data) => {
      toast.success(data.message);
      setFeatProducts(
        (prev) =>
          prev &&
          prev.map((prod) =>
            prod.id === product.id ? { ...prod, is_cart: !prod.is_cart } : prod
          )
      );
      addToCart(product.id.toString(), product.cart_item_id?.toString());
      setCart(data.data.orders);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteCartItem, isPending: isPendingDeleteCartItem } =
    useMutation({
      mutationFn: () =>
        cartService.deleteCartItem(
          !cartStore && product.cart_item_id
            ? product.cart_item_id ?? 0
            : Number(
                cartStore?.items.find((t) => t.product.id === product.id)?.id
              )
        ),
      onSuccess: (data) => {
        toast.success(data.message);
        setFeatProducts(
          (prev) =>
            prev &&
            prev.map((prod) =>
              prod.id === product.id
                ? { ...prod, is_cart: !prod.is_cart }
                : prod
            )
        );
        setCart(data.data);

        removeFromCart(product.id.toString());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const handleAddToCart = async () => {
    mutate({ productId: product.id, qty: 1 });
  };

  const { mutate: changeFavorite, isPending: isPendingChangeFavorite } =
    useMutation({
      mutationKey: ["toggleFavorite"],
      mutationFn: (data: { productId: number }) =>
        productService.toggleFavorite(data),
      onSuccess: (data) => {
        toast.success(data.message);
        if (data.data.product.is_favorite) {
          setFavsProducts((prev) => [...(prev || []), product]);
        } else {
          setFavsProducts(
            (prev) => prev && prev?.filter((fav) => fav.id !== product.id)
          );
        }
        toggleFavorite(product.id.toString(), data.data.product.is_favorite);
      },
      onError: (data) => {
        toast.error(data.message);
      },
    });
  useEffect(() => {
    if (
      product.is_cart &&
      !cartStore?.items.find((item) => item.product.id === product.id)
    ) {
      addToCart(product.id.toString(), product.cart_item_id?.toString());
    }
  }, [product.is_cart]);
  useEffect(() => {
    if (!product) return;
    setFavorites((prevFavs) => {
      const updatedFavs =
        prevFavs && prevFavs.length > 0 ? [...prevFavs] : [...favorites];
      const exists = updatedFavs.some(
        (fav) => fav.productId === product.id.toString()
      );
      if (!exists) {
        updatedFavs.push({
          productId: product.id.toString(),
          is_favorite: product.is_favorite,
        });
      }
      return updatedFavs;
    });
  }, [product]);
  const isProductInCart = cart[product.id] !== undefined;
  return (
    <div className="flex flex-col min-w-[100%] min-h-full m-auto ">
      <div className="card border flex h-64 w-auto relative justify-center items-center p-3 rounded-2xl">
        {product.discount_percentage && (
          <div className="discount p-2 border rounded-lg absolute top-3 text-xs text-main rtl:end-3 ltr:start-3">
            {product.discount_percentage} {t("OFF")}
          </div>
        )}

        <div className="flex relative size-full flex-col">
          <div className="flex z-5 text-main ltr:flex-row rtl:flex-row-reverse justify-end mb-2  top-3 gap-1 end-3">
            {/* <div className="border hover:scale-110 p-1 rounded-lg">
              <TLAddToCart />
            </div> */}
            {isProductInCart ? (
              <button
                onClick={() => deleteCartItem()}
                disabled={isPendingDeleteCartItem}
                className="addCart cursor-pointer duration-300 transition-all disabled:opacity-60 hover:shadow-lg z-40 font-medium flex items-center justify-center rounded-xl gap-2"
              >
                <div className="border hover:scale-110 p-1 rounded-lg">
                  <TLRemoveCart />
                </div>
              </button>
            ) : (
              !isProductInCart && (
                <button
                  onClick={handleAddToCart}
                  disabled={isPending}
                  className="addCart cursor-pointer transition-all duration-300 disabled:opacity-60 hover:scale-105 hover:shadow-lg z-40 font-medium flex items-center justify-center rounded-xl gap-2"
                >
                  {isPending ? (
                    <LoadingSpinner size="20" />
                  ) : (
                    <div className="border hover:scale-110 p-1 rounded-lg">
                      <TLAddToCart />
                    </div>
                  )}
                </button>
              )
            )}
            {favorites.find((f) => f.productId === product.id.toString())
              ?.is_favorite === true ? (
              <button
                onClick={() => changeFavorite({ productId: product.id })}
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
                onClick={() => changeFavorite({ productId: product.id })}
                className="cursor-pointer"
                disabled={isPendingChangeFavorite}
              >
                {isPendingChangeFavorite ? (
                  <LoadingSpinner className="size-8.5" />
                ) : (
                  <div className="border p-1 rounded-lg">
                    <TLHeartIcon />
                  </div>
                )}
              </button>
            )}
            {/* <div className="border p-1 rounded-lg">
              <TLHeartIcon />
            </div> */}
          </div>
          <Link
            href={`/product/${product.id}`}
            className="relative z-[4] size-full"
          >
            <Image
              fill
              src={product.image}
              alt={product.name}
              className="absolute inset-0 object-contain"
            />
          </Link>
        </div>
      </div>
      <div className="flex text-sm mt-2 flex-row justify-between">
        {product.categories.length > 0 && (
          <span className="text-[#545454] text-xs">
            {product.categories[0].name}
          </span>
        )}

        <div className="flex flex-row items-center gap-1">
          <TLStarFill />
          <span className="font-bold">{product.rates.avg}</span>
          {product.rates.count && (
            <span className="text-xs">({product.rates.count})</span>
          )}
        </div>
      </div>
      <Link href={`/product/${product.id}`}>
        <h1 className="font-medium lg:text-base text-sm">{product.name}</h1>
      </Link>
      <div className="flex flex-row items-center mt-4 justify-between">
        <div className="text-lg font-medium">
          {product.price} {t("AED")}
        </div>
        {product.color_list.length > 0 && (
          <div className="flex items-center flex-row gap-1">
            {product.color_list.slice(0, 3).map((color) => (
              <div
                key={color}
                className="rounded-full size-4 "
                style={{ backgroundColor: color }}
              ></div>
            ))}
            {product.color_list.length > 3 && (
              <span className="text-xs ">+{product.color_list.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
