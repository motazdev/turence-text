"use client";
import TLEdit from "@/components/icons/tl-edit-icon";
import DeleteAddressDialog from "@/components/profile/delete-address-dialog";
import UpdateAddressDialog from "@/components/profile/update-address-dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import AddNewAddressDialog from "../shared/add-new-address-dialog";
import Image from "next/image";
import { nothingExist } from "@/assets";
import { useQuery } from "@tanstack/react-query";
import addressService from "@/services/address";
import { useGlobalAppData } from "@/contexts/global/global.context";
import { Skeleton } from "../ui/skeleton";
import LoadingSpinner from "../shared/LoadingSpinner";
const AddressesList = () => {
  const t = useTranslations();
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [openAddNewAddress, setOpenAddNewAddress] = useState(false);
  const [openDeleteAddress, setOpenDeleteAddress] = useState(false);
  const [isLoadingSetDefault, setIsLoadingSetDefault] = useState(false);

  const isEmpty = false;
  const { data, isLoading } = useQuery({
    queryKey: ["user-addresses-profile"],
    queryFn: () => addressService.getAllAddresses(),
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const { setUserAddresses, userAddresses } = useGlobalAppData();
  useEffect(() => {
    if (data) {
      setUserAddresses(data.data);
    }
  }, [data]);
  const handleSetDefaultAddress = async (addressId: number) => {
    setIsLoadingSetDefault(true);
    const addedAddress = await addressService.setDefaultAddress(addressId);
    if (addedAddress) {
      setUserAddresses(addedAddress.data);
    }
    setIsLoadingSetDefault(false);
  };
  return (
    <div className="flex flex-col">
      {!isEmpty && (
        <>
          <div className="flex flex-col divide-y">
            <AddNewAddressDialog
              openNewAddress={openAddNewAddress}
              setOpenNewAddress={setOpenAddNewAddress}
            />
            {isLoading && (
              <div className="flex flex-col gap-2 lg:gap-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="w-full h-[90px] rounded-2xl" />
                ))}
              </div>
            )}
            {data &&
              userAddresses &&
              userAddresses.length > 0 &&
              userAddresses.map((address) => (
                <div
                  key={address.id}
                  className="grid grid-cols-1 gap-4 md:grid xl:grid-cols-5 items-start w-full rounded-xl p-4"
                >
                  <UpdateAddressDialog
                    address={address}
                    isOpen={openUpdateAddress}
                    setIsOpen={setOpenUpdateAddress}
                  />
                  {/* Address Section */}
                  <div className="flex flex-row items-start justify-between">
                    <div className="md:flex flex-col md:col-span-1 gap-x-4 md:max-w-48">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        {t("Address")}
                      </p>
                      <p className="text-gray-900 break-all font-medium">
                        {address.title}
                      </p>
                    </div>
                  </div>
                  <div className="md:flex flex-col gap-x-4">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      {t("Address Description")}
                    </p>
                    <p className="text-gray-900 font-medium">
                      {address.description}
                    </p>
                  </div>
                  <div className="md:flex md:flex-row md:col-span-2 w-full flex flex-row items-start md:gap-14 gap-5">
                    {/* Country Section */}
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 font-medium">
                        {t("City")}
                      </p>
                      <p className="text-gray-900 font-medium">
                        {address.city.name}
                      </p>
                    </div>

                    {/* City Section */}
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 font-medium">
                        {t("region")}
                      </p>
                      <p className="text-gray-900 font-medium">
                        {address.region.name}
                      </p>
                    </div>

                    {/* Phone Section */}
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 font-medium">
                        {t("Phone")}
                      </p>
                      <p dir="ltr" className="text-gray-900 font-medium">
                        +{address.mobile_country_code} {address.mobile}
                      </p>
                    </div>
                  </div>
                  <hr className="md:hidden" />
                  {/* Actions Section */}
                  <div className="flex flex-row gap-x-2 col-span-1 justify-start items-start">
                    <button
                      onClick={() => setOpenUpdateAddress(true)}
                      type="button"
                      className="flex justify-center cursor-pointer items-center w-8 md:size-10 size-8 rounded-[10px] bg-[#0E38260D]"
                    >
                      <TLEdit />
                    </button>

                    <DeleteAddressDialog
                      openNewAddress={openDeleteAddress}
                      address={address}
                      setOpenDeleteAddress={setOpenDeleteAddress}
                    />

                    {address.is_default ? (
                      <Button
                        variant="outline"
                        className="text-main flex-1 hover:text-main/80 min-w-28 border-main"
                      >
                        {t("Default")}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        disabled={isLoadingSetDefault}
                        className="text-white flex-1 min-w-28 bg-main hover:bg-main/80 cursor-pointer hover:text-white"
                      >
                        {isLoadingSetDefault ? (
                          <LoadingSpinner />
                        ) : (
                          t("Set default")
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            {/* <div className="grid grid-cols-1 gap-4 md:grid xl:grid-cols-4 items-center w-full  rounded-xl p-4 ">
              <div className="md:flex flex-col md:col-span-1 gap-x-4 md:max-w-48">
                <p className="text-sm text-gray-500 font-medium">
                  {t("Address")}
                </p>
                <p className="text-gray-900 font-medium">
                  22Bader - alam Street - 321
                </p>
              </div>

              <div className="md:flex md:flex-row md:col-span-2 flex w-4/5 flex-row items-center md:gap-14 gap-5">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-medium">
                    {t("Country")}
                  </p>
                  <p className="text-gray-900 font-medium">Egypt</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-medium">
                    {t("City")}
                  </p>
                  <p className="text-gray-900 font-medium">Cairo</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-medium">
                    {t("Phone")}
                  </p>
                  <p className="text-gray-900 font-medium">01145080996</p>
                </div>
              </div>
              <hr className="md:hidden" />
              <div className="flex flex-row gap-x-2 col-span-1 justify-end">
                <button
                  onClick={() => setOpenUpdateAddress(true)}
                  type="button"
                  className="flex justify-center cursor-pointer items-center w-8 md:size-10 size-8 rounded-[10px] bg-[#0E38260D]"
                >
                  <TLEdit />
                </button>

                <DeleteAddressDialog />

                {true ? (
                  <Button
                    variant="outline"
                    className="text-main cursor-pointer min-w-28 border-main "
                  >
                    {t("Default")}
                  </Button>
                ) : (
                  <Button className="text-white min-w-28 bg-main hover:bg-main/90 cursor-pointer hover:text-white  ">
                    {t("Set default")}
                  </Button>
                )}
              </div>
            </div> */}
          </div>
          {userAddresses && userAddresses.length > 0 && (
            <div className="add-address mt-6 gap-2 flex justify-center items-center">
              <div
                onClick={() => setOpenAddNewAddress(true)}
                className="cursor-pointer justify-center flex"
              >
                <Plus />
                <h3> {t("Add New Address")}</h3>
              </div>
            </div>
          )}
        </>
      )}
      {userAddresses?.length === 0 && data && userAddresses && (
        <div className="flex mb-6 py-20 justify-center gap-y-4 flex-col items-center">
          <div className="relative size-20">
            <Image src={nothingExist} alt="no-addresses" className="absolute" />
          </div>
          <p>{t("There is no addresses right now")}</p>
          <div className="add-address gap-2 flex justify-center items-center">
            <div
              onClick={() => setOpenAddNewAddress(true)}
              className="cursor-pointer font-medium justify-center flex"
            >
              <Plus />
              <h3> {t("Add New Address")}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressesList;
