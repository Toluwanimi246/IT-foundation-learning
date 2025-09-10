"use client";
import { useEffect, useState } from "react";

import Footer from "../Components/footer";
import HomePostPreview from "../Components/homePostPreview";
import Image from "next/image";
import Carousel from "../Components/postCarousel";
import RegularPostPreview from "../Components/regularPostPreview";

export default function MainPage() {
  type Post = {
  id: string;
  title: string;
  content: string;
  category: string;
  details: string;
  tags: string[];
  imageUrl : string;
};

  const backendUrl = "https://localhost:44372"; 
  const [posts, setPosts] = useState<Post[]>([]);
   const [visibleCount, setVisibleCount] = useState(3); 

  useEffect(() => {
    fetch("https://localhost:44372/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);



  const [singlePost, setSinglePost] = useState<Post | null>(null);

  useEffect(() => {
    fetch("https://localhost:44372/api/posts/68ac34fc4e1128649b517cf6")
      .then((res) => res.json())
      .then((data) => setSinglePost(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLoadMore = () => {
      setVisibleCount((prev) => prev + 3);
    };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="w-1/2">
          <div className="text-5xl font-bold pr-35 pl-45 pt-30 justify-center items-center">
            <h1>Create</h1>
            <h1 className="pl-18">Sphere</h1>
            <h2 className="text-xl p-4 pl-2 font-medium">Art is the soul's communication</h2>
          </div>
          
          <div>
            <HomePostPreview id="68ac34fc4e1128649b517cf6" />
          </div>
        </div>

        <div className="relative w-1/2 h-[700px]">
          {singlePost?.imageUrl && (
            <Image
                src={`${backendUrl}${singlePost.imageUrl}`}
                alt={singlePost.title}
                fill
                className="object-cover pl-9"
                unoptimized
              />
          )}
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-5xl py-15 p-5 flex justify-center mt-50 font-semibold">FEATURED POSTS</h1>
        <Carousel />
      </div>
      <div className="my-50 mx-30 mb-5"><RegularPostPreview posts={posts.slice(0, visibleCount)} /></div>

      {visibleCount < posts.length && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-10 py-4 bg-[#5a7191] text-white rounded-lg hover:bg-[#435670] text-3xl"
          >
            LOAD MORE
          </button>
        </div>
      )}
      <Footer/>
    </div>
  );
}
