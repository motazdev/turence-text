"use client";
import { footerBg, logoWhite } from "@/assets";
import TLFacebook from "@/components/facebook-icon";
import TLInstagramIcon from "@/components/instagram-icon";
import TLLinkedIn from "@/components/linkedin-icon";
import TLTelegramIcon from "@/components/telegram-icon";
import TLTwitter from "@/components/twitter-icon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import TLWhatsAppIcon from "@/components/whatsapp-icon";
import { useHomeData } from "@/contexts/global/home-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import appService from "@/services/app";
import LoadingSpinner from "../shared/LoadingSpinner";
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});
const FooterStyle13 = () => {
  const { homeData } = useHomeData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ email: values.email });
  }
  const t = useTranslations();
  const { mutate, isPending } = useMutation({
    mutationKey: ["send-email"],
    mutationFn: ({ email }: { email: string }) =>
      appService.subscribe({ email }),
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      form.reset();
    },
  });
  return (
    <footer className=" pb-8 bg-[#1B1B1B]  mt-5 relative w-full   h-full ">
      <div className="bg-[#020202B2] absolute inset-0 size-full z-20"></div>
      <Image
        src={footerBg}
        alt=""
        fill
        className="z-10 object-cover  size-full absolute object-top "
      />
      <div className="flex container z-[35]  mx-auto lg:px-20 px-6 flex-row items-center gap-3 justify-between text-white  pt-20 pb-6  mt-4 font-semibold">
        <div className="grid grid-cols-2 z-[35] gap-6 lg:grid-cols-6">
          <div className=" z-[35] flex gap-y-4 flex-col order-1 col-span-2 max-w-[27rem]">
            <Image
              src={logoWhite}
              alt="dummy"
              className="z-30"
              width={130}
              height={36}
            />
            <p className="text-[#FFFFFFB2] font-medium">
              Ipsam in eos qui consequatur ab cum maxime.Soluta dolor quae Ipsam
              in eos qui consequatur ab .Soluta dolor quae Ipsam in eos
              quconsequatur ab cum maxime.Soluta dolor quae
            </p>

            {/* <div className="flex gap-4 text-white flex-row">
              <Link href="#/>
                <TLFacebook />
              </Link>
              <Link href="#/>
                <TLTwitter />
              </Link>
              <Link href="#/>
                <TLInstagramIcon />
              </Link>
              <Link href="#/>
                <TLLinkedIn />
              </Link>
              <Link href="#/>
                <TLWhatsAppIcon />
              </Link>
              <Link href="#/>
                <TLTelegramIcon />
              </Link>
            </div> */}
          </div>
          <div className="lg:order-3 order-2">
            <h3 className="mb-4 text-white text-xl font-bold">
              {t("Policies")}
            </h3>
            <ul className="space-y-4 text-[#FFFFFFB2]">
              <li className="font-medium ">
                <Link href={"/refund-policy"}>{t("Refund Policy")}</Link>
              </li>
              <li className="font-medium ">
                <Link href={"/about-us"}>{t("About Us")}</Link>
              </li>
              <li className="font-medium ">
                <Link href={"/cancellation-policy"}>
                  {t("Cancellation Policy")}
                </Link>
              </li>
              <li className="font-medium ">
                <Link href={"/terms-conditions"}>
                  {t("Terms and Conditions")}
                </Link>
              </li>
              <li className="font-medium ">
                <Link href={"/privacy-policy"}>{t("Privacy Policy")}</Link>
              </li>
            </ul>
          </div>

          <div className="lg:order-2 order-3">
            <h3 className="mb-4 text-white text-xl font-bold">
              {t("Let Us Help")}
            </h3>
            <ul className="space-y-4 text-[#FFFFFFB2]">
              <li className="font-medium ">
                <Link href={"/profile"}>{t("My Account")}</Link>
              </li>
              <li className="font-medium ">
                <Link href={"/faqs"}>{t("FAQs")}</Link>
              </li>
              <li className="font-medium ">
                <Link href={"/contact-us"}>{t("Contact & Support")}</Link>
              </li>
              <li className="font-medium ">
                <Link href={"/categories"}>{t("Categories")}</Link>
              </li>
              <li className="font-medium ">
                <Link href={"/products"}>{t("All Products")}</Link>
              </li>
            </ul>
          </div>

          <div className="order-5 gap-y-5 flex flex-col col-span-2">
            <h3 className=" text-white text-xl font-bold">{t("Send Email")}</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative ">
                          <Input
                            placeholder={t("Email Address")}
                            className="bg-white text-main-black pe-36 flex-1 h-16 shadow-none focus-visible:z-10"
                            {...field}
                          />
                          <Button
                            disabled={
                              isPending || !form.getFieldState("email").isDirty
                            }
                            className="absolute cursor-pointer bg-main hover:bg-main/90 w-32 py-6 end-2 top-2"
                          >
                            {isPending ? <LoadingSpinner /> : t("Send")}
                          </Button>
                        </div>
                      </FormControl>

                      <FormMessage className="flex justify-end font-semibold" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <p>{t("Follow Us")}</p>
            <div className="flex gap-4 text-white flex-row">
              {homeData.communications.communication_facebook && (
                <Link href={homeData.communications.communication_facebook}>
                  <TLFacebook className="w-5 h-5 sm:w-3.5 sm:h-3.5 lg:w-6 lg:h-6" />
                </Link>
              )}
              {homeData.communications.communication_twitter && (
                <Link href={homeData.communications.communication_twitter}>
                  <TLTwitter className="w-5 h-5 sm:w-3.5 sm:h-3.5 lg:w-6 lg:h-6" />
                </Link>
              )}
              {homeData.communications.communication_instagram && (
                <Link href={homeData.communications.communication_instagram}>
                  <TLInstagramIcon className="w-5 h-5 sm:w-3.5 sm:h-3.5 lg:w-6 lg:h-6" />
                </Link>
              )}
              {homeData.communications.communication_linkedin && (
                <Link href={homeData.communications.communication_linkedin}>
                  <TLLinkedIn className="w-5 h-5 sm:w-3.5 sm:h-3.5 lg:w-6 lg:h-6" />
                </Link>
              )}
              {homeData.communications.communication_whatsapp && (
                <Link
                  href={`tel:${homeData.communications.communication_whatsapp}`}
                >
                  <TLWhatsAppIcon className="w-5 h-5 sm:w-3.5 sm:h-3.5 lg:w-6 lg:h-6" />
                </Link>
              )}

              {homeData.communications.communication_telegram && (
                <Link href={homeData.communications.communication_telegram}>
                  <TLTelegramIcon className="w-5 h-5 sm:w-3.5 sm:h-3.5 lg:w-6 lg:h-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterStyle13;
