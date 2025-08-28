"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IAddress, ICart, IReturnResponse } from "@/utils/types";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
} from "@tanstack/react-query";
import LoadingSpinner from "../shared/LoadingSpinner";

const ChangeAddressDialog = ({
  setOpenNewAddress,
  isOpen,
  setIsOpen,
  addresses,
  refetch,
  isPending,
  updateCartAddress,
  openNewAddress,
  isLoadingAddress,
}: {
  isLoadingAddress: boolean;
  setOpenNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
  addresses: IAddress[] | null;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IReturnResponse<IAddress[]>, Error>>;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  isPending: boolean;
  updateCartAddress: UseMutateFunction<
    IReturnResponse<ICart>,
    Error,
    {
      address_id: string;
    },
    unknown
  >;
  openNewAddress: boolean;
}) => {
  const formSchema = z.object({
    address_id: z.string(),
  });

  const t = useTranslations();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address_id: "",
    },
  });

  useEffect(() => {
    if (openNewAddress) {
      setIsOpen(false);
    }
  }, [openNewAddress]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    updateCartAddress({ address_id: values.address_id });
    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <span className="underline text-sm font-medium">{t("Change")}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Change Address")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col mt-4 gap-3"
          >
            <FormField
              control={form.control}
              name="address_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" md:text-base font-medium">
                    {t("Select Address")}
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value); // Update the form field value
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full border border-solid py-8 md:rounded-2xl rounded-xl">
                        <SelectValue
                          placeholder={
                            !isLoadingAddress &&
                            `
                            ${
                              addresses?.find((address) => address.is_default)
                                ?.title
                            }
                            `
                          }
                        />
                      </SelectTrigger>
                      <SelectContent
                        defaultValue={
                          addresses?.find((address) => address.is_default)?.id
                        }
                      >
                        {addresses?.map((address) => (
                          <SelectItem
                            key={address.id}
                            value={address.id.toString()}
                          >
                            {address.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row mt-4">
              <Button
                disabled={isPending}
                type="submit"
                className="flex-1 bg-main border border-main hover:bg-main/90 hover:border-main/90 cursor-pointer rounded-xl py-6"
              >
                {isPending ? <LoadingSpinner /> : t("save")}
              </Button>
              <DialogClose asChild className="flex-1 cursor-pointer">
                <Button
                  onClick={() => {
                    setOpenNewAddress(true);
                  }}
                  type="button"
                  variant="outline"
                  className="flex-1 border-main text-main hover:bg-transparent hover:text-main py-6 rounded-xl"
                >
                  {t("Add New Address")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAddressDialog;
