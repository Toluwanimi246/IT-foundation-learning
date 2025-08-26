"use client";
import { useEffect, useState } from "react";
import bgLibarian from "../../../public/night_city.jpg"
import FeaturedPostPreview from "../Components/homePostPreview";
import PostPreview from "../Components/carouselPostPreview";
import Footer from "../Components/footer";
import HomePostPreview from "../Components/homePostPreview";
import CarouselPostPreview from "../Components/carouselPostPreview";

export default function MainPage() {
  type Post = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  imageUrl : string;
};

  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    fetch("https://localhost:44372/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  

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
        <div className="w-1/2"
          style={{
            backgroundImage: `url(${bgLibarian.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      <div className="mt-8">
        <h1 className="text-5xl py-15 p-5 flex justify-center mt-50 font-semibold">FEATURED POSTS</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-9">
          {posts.map((post) => (
            <CarouselPostPreview
              key={post.id}
              id={post.id}
              content = {post.content}
              title={post.title}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
