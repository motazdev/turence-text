import AppContainer from "@/components/AppContainer";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import ImagesSlider from "@/components/single-product/images-slider";
import ProductSideInfo from "@/components/single-product/product-side-info";
import RatingReviewsData from "@/components/single-product/rating-reviews-data";
import SimilarItems from "@/components/single-product/similar-items";
import productService from "@/services/product";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const data = await productService.getSingleProduct(parseInt(id));
  return (
    <div>
      <PageHeader text="Product Details" />
      <AppContainer>
        <AppBreadCrumb
          steps={[
            { text: "Our Categories", href: "/categories" },
            { text: "Product Details", href: `/product/${id}` },
          ]}
        />
      </AppContainer>
      {/* START PRODUCT INFO (IMAGES, DATA) */}
      <AppContainer className="grid lg:grid-cols-12 gap-3 md:gap-8">
        <div className="lg:col-span-5 col-span-full">
          <ImagesSlider data={data.data.photo_gallery} />
        </div>
        <ProductSideInfo data={data.data} />
      </AppContainer>
      <AppContainer>
        <RatingReviewsData productId={parseInt(id)} data={data.data.rates} />
      </AppContainer>
      <AppContainer>
        <SimilarItems data={data.data.similar_products} />
      </AppContainer>
      {/* <FeedbackSuccessDialog /> */}
      {/* <FeedbackFailDialog /> */}
    </div>
  );
};

export default Page;
