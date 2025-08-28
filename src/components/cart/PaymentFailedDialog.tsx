import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { paymentFailed } from "@/assets";

const PaymentFailedDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}) => {
  const t = useTranslations();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <div className="BuyDone text-center flex flex-col gap-2 items-center">
          <div className="relative w-36 h-36">
            <Image src={paymentFailed} fill alt="failed" />
          </div>
          <h3 className="text-xl">{t("Payment Failed")}</h3>
          <p className="text-lg text-gray-500 max-w-sm mb-2 text-center">
            {t("Payment Failed desc")}
          </p>
          <div className="flex flex-row w-full justify-center gap-2">
            <Link href={`/contact-us`} className=" !w-2/4">
              <Button className="flex hover:bg-red-600 p-6 w-full font-bold cursor-pointer text-base bg-red-600 flex-grow ">
                {t("Contact Us")}
              </Button>
            </Link>
            <Button
              onClick={() => setIsOpen(false)}
              className="flex-1 font-semibold border !w-2/4 border-solid cursor-pointer text-red-600 text-base border-red-600 bg-white hover:bg-white p-6 flex-grow "
            >
              {t("Later")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentFailedDialog;
