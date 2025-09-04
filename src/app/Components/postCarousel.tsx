"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type Post = {
  id: string;
  title: string;
  content: string;
  details: string;
  category: string;
  imageUrl: string;
};

const backendUrl = "https://localhost:44372";

export default function Carousel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [current, setCurrent] = useState(0);

  
  useEffect(() => {
    fetch(`${backendUrl}/api/posts`)
       .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // If you only want some posts, slice them here
      setPosts(data.slice(0, 6)); 
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      {/* Slides wrapper */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * (100 / 3)}%)` }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-1/3 flex-shrink-0 px-2"
          >
            <Image
              src={`${backendUrl}${post.imageUrl}`}
              alt={post.title}
              width={400}
              height={650}
              className="w-full h-48 object-cover rounded-lg"
              unoptimized
            />
            <h2 className="text-center text-xl font-semibold mt-2 bg-[#d8d8d8] rounded p-3">{post.title}</h2>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white font-bold px-3 py-1 rounded-full"
      >
        ›
      </button>
    </div>
  );
}
