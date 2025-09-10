"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/Components/navbar";
import Footer from "@/app/Components/footer";
import Comments from "@/app/Components/comments";

type Post = {
  id: string;
  title: string;
  content: string;
  details: string;
  imageUrl: string;
};

export default function PostPage() {
  const { id } = useParams(); // grab the id from route
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://localhost:44372/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
  <div>
    <Navbar />
    <div className="flex flex-col m-5">
      <div className="p-3">
        <h1 className="text-5xl">{post.title}</h1>
      </div>
      <div className="flex flex-row px-10">
        <div>
          <p className="text-xl">{post.content}</p>
        </div>
        <div>
          {post.imageUrl && (
          <img
            src={`https://localhost:44372${post.imageUrl}`}
            alt={post.title}
            className="w-full max-w-2xl"
          />
        )}
        </div>
      </div>
      <div>{post.details}</div>
      <div><Comments/> </div>

    </div>
    <Footer />
    </div>
  );
}
