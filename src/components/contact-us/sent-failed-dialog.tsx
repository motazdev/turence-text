import { XMark } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import Image from "next/image";
const SentFailedDialog = ({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
}) => {
  const t = useTranslations();
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] max-w-[350px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col text-center justify-center items-center">
          <Image
            src={XMark}
            alt="sucess-feedback"
            className="md:size-[100px] size-[70px]"
          />
          <p className=" sm:max-w-md mt-4 max-w-[90%] m-auto font-semibold">
            {t("Message Sent Successfully")}
          </p>
          <p className=" sm:max-w-md font-normal text-[#545454] max-w-[24rem] text-sm">
            {t("Message Sent Successfully desc")}
          </p>
        </div>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              className="md:py-6 py-3 flex-1 cursor-pointer  hover:text-[#D90202]/90 border border-[#D90202] text-[#D90202] rounded-2xl"
            >
              {t("Later")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SentFailedDialog;
