import Navbar from "@/components/shared/navbar/navbar";
import FooterStyle13 from "@/components/ui/footer-style-13";
import { HomeDataProvider } from "@/contexts/global/home-data";
import appService from "@/services/app";
import type { Metadata } from "next";
import "../globals.css";
import ProductsProvider from "@/contexts/products/products.provider";
import PaymentStatusAlerts from "@/components/payment-status-alerts";

export const metadata: Metadata = {
  title: "Turence",
  description:
    "Turence | Modern Style Boutique - Where Elegance Meets Contemporary Fashion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homeData = await appService.getHomeData();
  const settings = await appService.getAppSettings();
  return (
    <HomeDataProvider appSettings={settings.data} homeData={homeData.data}>
      <PaymentStatusAlerts />
      <ProductsProvider>
        <Navbar />
        {children}
        <FooterStyle13 />
      </ProductsProvider>
    </HomeDataProvider>
  );
}
