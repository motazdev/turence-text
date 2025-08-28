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
import Image from "next/image";
import Link from "next/link";
const FeedbackFailDialog = () => {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px] max-w-[350px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col text-center justify-center items-center">
          <Image
            src={XMark}
            alt="failed-feedback"
            className="md:size-[100px] size-[70px]"
          />
          <p className=" sm:max-w-md mt-4 max-w-[90%] m-auto font-bold">
            Oops! Something Went Wrong
          </p>
          <p className=" sm:max-w-md text-[#545454] max-w-[14rem] text-sm">
            Something went wrong. Please try again later. If the issue persists,
            contact our support team for assistance.
          </p>
        </div>
        <DialogFooter className="flex flex-row gap-2">
          <Link href="/contact-us" className="basis-1/2">
            <Button
              type="button"
              className="w-full flex justify-center items-center cursor-pointer py-6 bg-[#D90202] hover:bg-[#D90202]/80 border border-[#D90202] rounded-2xl"
            >
              Contact Us
            </Button>
          </Link>
          <DialogClose asChild className="basis-1/2">
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer py-6 border border-[#D90202] hover:text-[#D90202]/80 hover:bg-white text-[#D90202] rounded-2xl"
            >
              Later
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackFailDialog;
