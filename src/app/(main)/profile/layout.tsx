import AppContainer from "@/components/AppContainer";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import Links from "./Links";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <AppContainer>
        <AppBreadCrumb
          steps={[
            { text: "Home", href: "/home" },
            { text: "My Profile", href: "/profile" },
          ]}
        />
        <div className="rounded-[18px] border border-color overflow-hidden">
          <div className="px-3 hidden lg:block md:px-5 pt-4 md:pt-[29px] md:border-b border-color">
            <Links />
          </div>
          <div className="px-3 py-4 md:p-5 ">{children}</div>
        </div>
      </AppContainer>
    </section>
  );
}
