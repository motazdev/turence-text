import AccountInfo from "@/components/profile/account-info";
import UserProfileImg from "@/components/profile/user-profile-img";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const token = (await cookies()).get("token");

  if (!token) {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-y-4">
      <UserProfileImg />
      <AccountInfo />
    </div>
  );
};

export default Page;
