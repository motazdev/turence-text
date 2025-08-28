import AppContainer from "@/components/AppContainer";
import FavoritesContent from "@/components/favorites/favorites-content";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";

const Page = () => {
  return (
    <div>
      <PageHeader text={"My Favorites"} />
      <AppContainer>
        <AppBreadCrumb
          steps={[{ text: "Home", href: "/" }, { text: "My Favorites" }]}
        />
        <FavoritesContent />
      </AppContainer>
    </div>
  );
};

export default Page;
