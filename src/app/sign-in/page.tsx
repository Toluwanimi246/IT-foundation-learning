"use client";
import bcrypt from "bcryptjs";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { handleClientScriptLoad } from "next/script";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

type User = {
  email: string;
  password: string;
  username: string;
};

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleSignUp = () => {
    router.push('/sign-up');
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(`https://localhost:44372/api/Users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      alert(`Login failed: ${text}`);
      return;
    }

    const user = await res.json();

    // Save user in localStorage (or context)
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login successful!");
    router.push(redirectPath);

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
  }
};



  return (
    <div>
      <Navbar/>
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
     
      <div className="w-full md:block md:w-1/2 h-64 md:h-full">
        <img src = "/background.jpg"
          className="w-full h-full object-cover" 
          alt="background photo">
        </img>
      </div>
      <div className="w-full md:w-1/2 h-screen overflow-y-auto flex flex-col items-center justify-center">
          <div className="w-[85%] p-3 text-center items-center justify-center align-middle">
            <p className="lg:text-4xl md:text-3xl font-bold">Create Sphere</p>
          </div>

          <div className="justify-center items-center flex flex-col p-4 rounded shadow">
            <h1 className="lg:text-2xl md:text-xl underline p-2">Sign in to your Create Sphere Account</h1>
            <div className="w-[80%]">
                <div data-cy="Regular">
                </div>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                

                <label className="text-[14px] font-semibold m-0">Email:</label>
                <input
                  type="email" 
                  name ="email"
                  placeholder="Enter your company email"
                  className="border-[#979797] border-1 p-2 w-full rounded h-[35px]"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  >
                </input>

                <label className="text-[14px] font-semibold m-0">Password:</label>
                <input
                  type="password" 
                  name ="password"
                  placeholder="Enter your password"
                  className="border-[#979797] border-1 p-2 w-full rounded h-[35px]"
                  onChange={(e) => setPassword(e.target.value)}
                  required>
                </input>
              

              <div className="w-full">
                <button
                type="submit"
                className="w-full bg-[#5a7191] text-white px-4 py-2 rounded hover:bg-blue-900"
                >
                Submit
              </button>
              </div>
            </form>
              </div>

          </div>

          <div className="m-2">
              <p>
                  Don't have an account?{" "}
                <span
                  className="cursor-pointer font-semibold"
                  style={{ color: "#5a7191" }}
                  onClick={handleSignUp}
                  >
                  Sign Up
                </span>
              </p>
          </div>
       </div>
       
 </div>
 <Footer/>
 </div>

  );
}
