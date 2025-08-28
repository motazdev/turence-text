import { successFeedback } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
const FeedbackSuccessDialog = () => {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px] max-w-[350px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col text-center justify-center items-center">
          <Image
            src={successFeedback}
            alt="sucess-feedback"
            className="md:size-[100px] size-[70px]"
          />
          <p className=" sm:max-w-md mt-4 max-w-[90%] m-auto font-bold">
            Feedback Submit Successfully
          </p>
          <p className=" sm:max-w-md text-[#545454] max-w-[24rem] text-sm">
            Your feedback has been successfully submitted and is currently under
            management review.
          </p>
        </div>
        <DialogFooter className="w-full">
          <Button
            type="button"
            className="md:py-6 py-3 flex-1 cursor-pointer bg-[white] hover:bg-[white] border border-[#404040] text-[#404040] rounded-2xl"
          >
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackSuccessDialog;
