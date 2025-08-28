import { logo } from "@/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const UpperLogo = () => {
  const t = useTranslations();
  return (
    <div className="relative flex flex-col justify-center gap-y-2 items-center z-[-1]">
      <Link href={"/"} className="w-[102px] block md:w-[105px] mx-auto">
        <Image src={logo} alt="logo" loading="lazy" />
      </Link>
      <p className="text-[#8A8A8A] text-sm">
        {t("Please login to your account")}
      </p>
    </div>
  );
};

export default UpperLogo;
