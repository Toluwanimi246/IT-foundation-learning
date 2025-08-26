"use client";
import Image from "next/image";

type PostPreviewProps = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function RegularPostPreview({ id, title, imageUrl }: PostPreviewProps) {
  const backendUrl = "https://localhost:44372"; 

  return (
    <div>
      <a href={`/posts/${id}`}>
        {<Image
          src={`${backendUrl}${imageUrl}`}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
          unoptimized
        />}
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">{title}</h2>
        </div>
      </a>
    </div>
  );
}
