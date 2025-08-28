import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Cairo, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth/auth.provider";
import Provider from "@/components/Provider";
import { cookies } from "next/headers";
import GlobalProvider from "@/contexts/global/global.provider";

export const metadata: Metadata = {
  title: "Turence",
  description:
    "Turence | Modern Style Boutique - Where Elegance Meets Contemporary Fashion",
  icons: [
    {
      url: "/icons/logo.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/icons/logo.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  keywords: [
    "fashion",
    "boutique",
    "modern style",
    "elegance",
    "contemporary fashion",
    "clothing",
    "accessories",
    "trendy outfits",
    "stylish apparel",
    "fashion trends",
    "online shopping",
    "shopping experience",
    "online boutique",
    "fashion store",
    "unique styles",
    "affordable fashion",
  ],
  authors: [
    {
      name: "Turence",
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
  ],
  creator: "Turence",
  openGraph: {
    type: "website",
  },
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const userCookie = (await cookies()).get("user")?.value;

  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <AuthProvider authState={userCookie ? JSON.parse(userCookie) : null}>
        <Provider>
          <GlobalProvider>
            <NextIntlClientProvider messages={messages}>
              <body
                className={`${
                  locale == "en" ? poppins.className : cairo.className
                } antialiased`}
              >
                {children}
                <Toaster />
              </body>
            </NextIntlClientProvider>
          </GlobalProvider>
        </Provider>
      </AuthProvider>
    </html>
  );
}
