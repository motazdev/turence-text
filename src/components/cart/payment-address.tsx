"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import AddNewPaymentAddressDialog from "../shared/add-new-address-dialog";
import ChangeAddressDialog from "./change-address-dialog";
import useCartStore from "@/store/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import cartService from "@/services/cart";
import { toast } from "sonner";
import addressService from "@/services/address";
import { IAddress } from "@/utils/types";
import { useAuth } from "@/contexts/auth/auth.context";

const PaymentAddress = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();
  const [openNewAddress, setOpenNewAddress] = React.useState(false);
  const { cart: localCart, setCart } = useCartStore();
  const {
    data,
    refetch,
    isLoading: isLoadingAddress,
  } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: () => addressService.getAllAddresses(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: isOpen === true || openNewAddress === true,
  });
  const [userAddresses, setUserAddresses] = useState<IAddress[] | null>(
    data?.data ?? null
  );
  useEffect(() => {
    setUserAddresses(data?.data ?? null);
  }, [data]);
  const { mutate: updateCartAddress, isPending: isUpdateCartAddressPending } =
    useMutation({
      mutationFn: (data: { address_id: string }) =>
        cartService.addUpdateAddress(data),
      mutationKey: ["update-cart-address"],
      onSuccess: (data) => {
        if (data?.status) {
          toast.success(data.message);
          setCart(data.data);

          setIsOpen(false);
        }
      },
      onError: (error) => {
        toast.error(error.message);
        setIsOpen(false);
      },
    });
  const { user } = useAuth();
  return (
    <div className="mt-5 pt-5 border-t border-b pb-5 border-color">
      <div className="">
        <div className="flex flex-row justify-between">
          <span className="font-semibold text-lg">{t("Address")}</span>
          {localCart?.address && user ? (
            <ChangeAddressDialog
              isLoadingAddress={isLoadingAddress}
              isOpen={isOpen}
              isPending={isUpdateCartAddressPending}
              setIsOpen={setIsOpen}
              updateCartAddress={updateCartAddress}
              addresses={userAddresses}
              setOpenNewAddress={setOpenNewAddress}
              openNewAddress={openNewAddress}
              refetch={refetch}
            />
          ) : (
            <span
              onClick={() => setOpenNewAddress(true)}
              className="underline cursor-pointer text-sm font-medium"
            >
              {t("add new address")}
            </span>
          )}
          {user && (
            <AddNewPaymentAddressDialog
              setAsCartAddress={updateCartAddress}
              isCart={true}
              setOpenNewAddress={setOpenNewAddress}
              openNewAddress={openNewAddress}
            />
          )}
        </div>
        <span className="font-medium block mt-[6px]">
          {localCart?.address && (
            <span className="text-sm block mt-3">
              {localCart?.address.title} - {localCart?.address.description}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default PaymentAddress;
