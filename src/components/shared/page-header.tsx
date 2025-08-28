import { bgPattern } from "@/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import BorderedText from "./bordered-text";

const PageHeader = ({
  text,
  translated,
}: {
  text: string;
  translated?: string;
}) => {
  const t = useTranslations();
  return (
    <div className="relative flex justify-center items-center overflow-hidden h-56 bg-[#F5F5F5]">
      <Image
        src={bgPattern}
        alt="hero"
        className="absolute start-0 top-0 z-10 w-full h-full object-cover"
        priority
      />

      <div className="absolute text-center z-20 min-w-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%]">
        <BorderedText
          translated={translated}
          strokeWidth={0.1}
          text={text || undefined}
        />
      </div>
      <div className="flex text-center justify-center items-center">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold">
          {translated || t(text)}
        </h2>
      </div>
    </div>
  );
};

export default PageHeader;
