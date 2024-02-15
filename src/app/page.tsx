"use client"

import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from 'next-cloudinary';
import { useState } from "react";

type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function Home() {
  const [imageId, setImageId] = useState("cld-sample");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CldUploadButton 
        onUpload={(result:any) => {
          //console.log(result.info.public_id);
          setImageId(result.info.public_id);
        }}
        uploadPreset="pmfuynpr" />

      <CldImage
        width="400"
        height="300"
        src={imageId}
        sizes="100vw"
        //tint="70:blue:green:purple"
        cartoonify
        blurFaces
        alt="Description of my image"
      />

    </main>
  );
}
