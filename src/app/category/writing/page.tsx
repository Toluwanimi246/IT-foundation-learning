"use client";
import Footer from "@/app/Components/footer";
import Navbar from "@/app/Components/navbar";
import RegularPostPreview from "@/app/Components/regularPostPreview";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  content: string;
  category: string;
  details: string;
  tags: string[];
  imageUrl: string;
};

export default function Writing() {
  const backendUrl = "https://localhost:44372";

  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetch(`${backendUrl}/api/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Post[]) => setPosts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const category = "Writing";
  const filteredPosts = posts.filter((post) => post.category === category);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div>
      <Navbar/>
      <div className="text-5xl flex justify-center p-9">WRITING</div>
      <div className="my-20 mx-30 mb-5">
        <RegularPostPreview posts={filteredPosts.slice(0, visibleCount)} />
      </div>

      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-10 py-4 bg-[#5a7191] text-white rounded-lg hover:bg-blue-700 text-3xl"
          >
            LOAD MORE
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}
