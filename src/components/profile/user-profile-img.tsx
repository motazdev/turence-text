"use client";
import { useAuth } from "@/contexts/auth/auth.context";
import userService from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";

const UserProfileImg = () => {
  const t = useTranslations();
  const { user, setUserData } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadImageMutation = useMutation({
    mutationFn: async (imageFile: File) =>
      userService.updateImage({ image: imageFile }),
    onSuccess: (data) => {
      toast.success(data.message);
      setSelectedImage(null);
      setPreviewUrl(null);
      setUserData(data.data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setSelectedImage(file);

        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setPreviewUrl(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUploadClick = () => {
    if (selectedImage) {
      uploadImageMutation.mutate(selectedImage);
    } else {
      fileInputRef.current?.click();
    }
  };

  const currentImageSrc = previewUrl || user?.image || "";
  const buttonText = selectedImage ? t("Change") : t("Upload");

  return (
    <div className="user-photo">
      <div className="flex flex-row items-center gap-3">
        {user && (
          <div className="relative size-24 rounded-full">
            <Image
              src={currentImageSrc}
              fill
              alt="user-photo"
              className="rounded-full"
            />
          </div>
        )}

        <div className="flex flex-col gap-y-1">
          <h3 className="text-lg font-semibold">{t("Profile Photo")}</h3>
          <p className="text-[#8A8A8A] text-sm">
            {t("Upload Your Photo For Better Reach")}
          </p>

          <button
            onClick={handleUploadClick}
            disabled={uploadImageMutation.isPending}
            className="text-main-black border text-sm h-10 px-5 font-medium w-fit rounded-4xl cursor-pointer inline-flex items-center disabled:opacity-50 disabled:cursor-default"
          >
            {uploadImageMutation.isPending
              ? t("Uploading") + "..."
              : buttonText}
          </button>

          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileImg;
