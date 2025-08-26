"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image"; // 👈 correct import

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
};

export default function HomePostPreview({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`https://localhost:44372/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return null;

  return (
      <div className="rounded overflow-hidden bg-[#d8d8d8] m-8 flex flex-col justify-center items-center text-center p-6">
        <h1 className="p-4 text-4xl">{post.title.toUpperCase()}</h1>
        <h2 className="text-lg px-8">{post.content}</h2>
        <Link href={`/posts/${post.id}`}>
          <h1 className="p-3 font-bold text-blue-500 hover:cursor-pointer">READ MORE</h1>
        </Link>
      </div>
  );
}
