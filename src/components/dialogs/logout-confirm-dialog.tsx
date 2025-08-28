"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TLLogoutColored from "../icons/tl-logout-colored-icon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth/auth.context";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { removeCookie } from "@/utils/session";
import LoadingSpinner from "../shared/LoadingSpinner";
const LogoutConfirmDialog = ({
  forMobile = true,
  isOpen,
  setIsOpen,
}: {
  forMobile: boolean;
  setIsOpen?: (d: boolean) => void;
  isOpen?: boolean;
}) => {
  const t = useTranslations();
  const router = useRouter();
  const { logout } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logoutUser(),
    onSuccess: () => {
      if (setIsOpen) {
        setIsOpen(false);
      }
      removeCookie("token");
      removeCookie("user");
      logout();
      router.refresh();
      router.replace("/");
    },
  });
  return (
    <Dialog
      open={!forMobile ? isOpen : undefined}
      onOpenChange={!forMobile ? setIsOpen : undefined}
    >
      {forMobile && (
        <DialogTrigger asChild>
          <Button className="w-full cursor-pointer bg-[#D90202] hover:bg-[#D90202]/80 text-white py-6 rounded-xl font-medium transition-all duration-300 ">
            {t("Log Out")}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col text-center justify-center items-center">
          <TLLogoutColored />
          <p className=" sm:max-w-md max-w-[14rem] font-bold">
            {t("Are you sure you want to log out")}
          </p>
        </div>
        <DialogFooter className="flex flex-row">
          <Button
            onClick={() => mutate()}
            disabled={isPending}
            type="button"
            className="flex-1 cursor-pointer bg-[#D90202] hover:bg-[#D90202]/80 border border-[#D90202]"
          >
            {isPending ? <LoadingSpinner /> : t("logOut")}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer border border-[#D90202] hover:text-[#D90202]/80 hover:bg-white text-[#D90202]"
            >
              {t("Cancel")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutConfirmDialog;
