import TLChevronDown from "@/components/icons/tl-chevron-down-icon";
import TLUser from "@/components/icons/tl-user-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import Link from "next/link";

const UserSelectMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (d: boolean) => void;
}) => {
  const t = useTranslations();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <div className="flex flex-row items-center">
          <TLUser />
          <TLChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="items-start">
        <DropdownMenuItem>
          <Link href={"/profile"} className="w-full h-full">
            {t("Profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        >
          {t("logOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSelectMenu;
