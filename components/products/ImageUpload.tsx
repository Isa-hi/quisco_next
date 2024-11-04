"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload() {
  const [imageURL, setImageURL] = useState("");
  return (
    <CldUploadWidget
      uploadPreset="g7u0yspy"
      options={{ maxFiles: 1 }}
      onSuccess={(result, { widget }) => {
        //@ts-ignore
        setImageURL(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <div className="space-y-2">
          <label className="text-slate-800">Imagen Producto</label>
          <div
            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
            onClick={() => open()}
          >
            {imageURL ? (
              <div className="absolute inset-0 size-full">
                <Image
                  fill
                  src={imageURL}
                  alt="Product Image"
                  style={{ objectFit: "contain" }}
                />
              </div>
            ) : (
              <>
                <TbPhotoPlus className="w-10 h-10" />
                <span>Subir Imagen</span>
              </>
            )}
          </div>
          <input type="hidden" name="image" value={imageURL}/>
        </div>
      )}
    </CldUploadWidget>
  );
}