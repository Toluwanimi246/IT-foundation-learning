"use client";
import Image from "next/image";

type PostPreviewProps = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
};

export default function CarouselPostPreview({ id, title, imageUrl }: PostPreviewProps) {
  const backendUrl = "https://localhost:44372"; 

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#d8d8d8]">
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
