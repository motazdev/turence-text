"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import TLComment from "../icons/tl-comment-icon";
import TLStarFill from "../icons/tl-star-fill";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { IProduct, IWriteProductReviewBody } from "@/utils/types";
import userService from "@/services/user";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useWriteReviewFormSchema } from "@/lib/form-validation-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "../shared/LoadingSpinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
const SessionFeedbackDialog = ({ productId }: { productId: number }) => {
  const [hoverRating, setHoverRating] = useState("");
  const [currentRating, setCurrentRating] = useState<null | string>();
  const t = useTranslations();
  const router = useRouter();
  const [addRating, setAddRating] = useState(false);
  const [daneAddRate, setDoneAddRate] = useState(false);
  const renderStars = (avg: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <TLStarFill
        key={index}
        className={`${index < avg ? "opacity-100" : "opacity-40"} w-[26px]`}
      />
    ));
  };
  const formSchema = useWriteReviewFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      product_id: productId,
      rate: 0,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["write-review"],
    mutationFn: (data: IWriteProductReviewBody) =>
      userService.writeReview(data),
    onSuccess: (data) => {
      toast.success(data.message);
      setDoneAddRate(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  useEffect(() => {
    form.setValue("rate", parseInt(currentRating ?? "0"));
  }, [currentRating]);
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      comment: values.comment,
      product_id: productId,
      rate: parseInt(currentRating ?? "0"),
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-main py-6 rounded-xl cursor-pointer hover:bg-[#525252]">
          {t("Add Comment")} <TLComment />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] max-w-[300px]">
        <DialogHeader className="text-center flex justify-center items-center">
          <DialogTitle>{t("Session Feedback")}</DialogTitle>
          <DialogDescription className="text-[#545454] text-sm text-center max-w-[12rem] m-auto">
            {t("rate-desc")}
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="flex items-center justify-center gap-2">
            <fieldset className="space-y-4">
              <RadioGroup
                className="inline-flex gap-0"
                onValueChange={(v) => {
                  setCurrentRating(v);
                  //   form.setValue("rate", parseInt(v));
                }}
              >
                {["1", "2", "3", "4", "5"].map((value, id) => (
                  <label
                    key={value}
                    className="group relative cursor-pointer rounded-lg p-0.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating("")}
                  >
                    <RadioGroupItem
                      id={`${id}-${value}`}
                      value={value}
                      className="sr-only"
                    />
                    <TLStarFill
                      size="28"
                      className={`transition-all text-main ${
                        (hoverRating || parseInt(currentRating || "0")) >= value
                          ? "opacity-100"
                          : "opacity-40"
                      } group-hover:scale-110`}
                    />
                    <span className="sr-only">
                      {value} star{value === "1" ? "" : "s"}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </fieldset>
          </div>
          {form.formState.errors.rate && (
            <p className="text-destructive flex justify-center items-center">
              {form.formState.errors.rate.message}
            </p>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("Enter Your Comment Here")}
                      className="resize-none min-h-[10rem]"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 items-center gap-2 mt-5">
              <button
                className="h-12 cursor-pointer md:h-14 flex-c block flex-grow rounded-2xl border border-main text-main text-sm md:text-base font-semibold"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="h-12 cursor-pointer md:h-14 flex-c block flex-grow rounded-2xl bg-main text-white text-sm md:text-base font-semibold"
              >
                {isPending ? <LoadingSpinner /> : t("Submit")}
              </button>
            </div>
          </form>
        </Form>
        {/* <div className="flex flex-col text-center justify-center items-center">
          <div className="group w-full relative">
            <label
              htmlFor={"10"}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Your Comment
            </label>
            <Textarea className="resize-none min-h-[10rem]" />
          </div>
        </div>
        <DialogFooter className="flex flex-row">
          <Button
            type="button"
            className="flex-1 cursor-pointer bg-[#404040] hover:bg-[#333]/80 border border-[#404040]"
          >
            Send
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer border border-[#404040] hover:text-[#404040]/80 hover:bg-white text-[#404040]"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default SessionFeedbackDialog;
