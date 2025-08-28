"use client";
import TLTrash from "@/components/icons/tl-trash-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGlobalAppData } from "@/contexts/global/global.context";
import addressService from "@/services/address";
import { IAddress } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import LoadingSpinner from "../shared/LoadingSpinner";
const DeleteAddressDialog = ({
  address,
  setOpenDeleteAddress,
  openNewAddress,
}: {
  address: IAddress;
  openNewAddress?: boolean;
  setOpenDeleteAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const t = useTranslations();
  const { setUserAddresses } = useGlobalAppData();

  const { mutate, isPending } = useMutation({
    mutationFn: () => addressService.deleteAddress(address.id),
    mutationKey: ["delete-address"],
    onSuccess: async (data) => {
      if (data.status) {
        setOpenDeleteAddress(false);
        toast.success(data.message);
      }
      setUserAddresses(data.data);
    },
    onError: (error) => {
      setOpenDeleteAddress(false);
      toast.error(error?.message);
    },
  });
  return (
    <Dialog open={openNewAddress} onOpenChange={setOpenDeleteAddress}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex justify-center cursor-pointer items-center w-8 md:size-10 size-8 rounded-[10px] bg-[#D902020D]"
        >
          <TLTrash />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{t("Delete Address")}</DialogTitle>
          <DialogDescription>
            {t("Are you Sure To Delete This Adresss")}
          </DialogDescription>
        </DialogHeader>
        {/* <div className="flex flex-col text-center gap-y-2.5 justify-center items-center">
          <p className=" md:max-w-xs max-w-[14rem] font-medium text-center">
            {t("Are you sure you want to delete this address")}
          </p>
        </div> */}
        <DialogFooter className="flex flex-row">
          <Button
            type="button"
            onClick={() => mutate()}
            className="flex-1 cursor-pointer py-6 bg-[#D90202] hover:bg-[#D90202]/80 border border-[#D90202]"
          >
            {isPending ? <LoadingSpinner /> : t("delete")}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer py-6 border border-[#D90202] hover:text-[#D90202]/80 hover:bg-white text-[#D90202]"
            >
              {t("cancel")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAddressDialog;
