import Faqs from "@/components/home/faqs";
import Hero from "@/components/home/hero";
import HomeCategories from "@/components/home/home-categories";
import HowItWorks from "@/components/home/how-it-works";
import NeedHelpBox from "@/components/home/need-help-box";
import Reviews from "@/components/home/reviews";
import TopSellerProducts from "@/components/home/top-seller-products";
import ProductsProvider from "@/contexts/products/products.provider";

export default function Home() {
  return (
    <div>
      <Hero />
      <HomeCategories />
      <TopSellerProducts />
      <HowItWorks />
      <Reviews />
      <NeedHelpBox />
      <Faqs />
    </div>
  );
}
