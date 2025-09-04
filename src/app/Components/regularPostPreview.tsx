"use client";
import Image from "next/image";
import Link from "next/link";
import { BiCaretRightCircle } from "react-icons/bi";

type Post = {
  id: string;
  title: string;
  imageUrl: string;
  details: string;
  category: string;
  content: string;
};

type Props = {
  posts: Post[];
};

export default function RegularPostPreview({ posts }: Props) {
  const backendUrl = "https://localhost:44372";

  return (
    <div>
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`flex mb-52 mx-10 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
        >
          <div className="w-1/2">
            <a href={`/posts/${post.id}`}>
              <Image
                src={`${backendUrl}${post.imageUrl}`}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-78 object-cover"
                unoptimized
              />
            </a>
          </div>
          <div className="flex flex-col p-4 text-left w-1/2">
            <h2 className={`${index % 2 === 0 ? "pr-13" : "pl-13"}`}>{post.category}</h2>
            <h2 className={`text-5xl mb-2 ${index % 2 === 0 ? "pr-13" : "pl-13"}`}>{post.title}</h2>
            <p className={`text-xl ${index % 2 === 0 ? "pr-13" : "pl-13"}`}>{post.content}</p>
            <Link href={`/posts/${post.id}`}>
              <h1 className={`p-3 text-2xl text-blue-500 hover:cursor-pointer ${index % 2 === 0 ? "pr-13" : "pl-13"}`}>READ MORE
                <span><BiCaretRightCircle /></span></h1>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
