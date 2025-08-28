import AppContainer from "@/components/AppContainer";
import LanguageMenu from "@/components/auth/language-menu";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Cairo, Poppins } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Turence",
  description:
    "Turence | Modern Style Boutique - Where Elegance Meets Contemporary Fashion",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <div lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <NextIntlClientProvider messages={messages}>
        <div
          className={`${
            locale == "en" ? poppins.className : cairo.className
          } antialiased`}
        >
          <div className="relative min-h-screen ">
            <div className="overflow-hidden absolute w-full h-full z-[-1] left-2/4 translate-x-[-50%] top-2/4 translate-y-[-50%]">
              <div className="absolute rounded-full bg-white shadow-[0_0_76px_-56px_rgba(0,0,0,0.25)] size-[650px] z-10 left-2/4 translate-x-[-50%] top-2/4 translate-y-[-50%]"></div>
              <div className="absolute rounded-full bg-white shadow-[0_0_76px_-56px_rgba(0,0,0,0.25)] z-[9] size-[900px] left-2/4 translate-x-[-50%] top-2/4 translate-y-[-50%]"></div>
            </div>
            <AppContainer className="py-8 ">
              <LanguageMenu />
              {children}
            </AppContainer>
          </div>
        </div>
      </NextIntlClientProvider>
    </div>
  );
}
