"use client";
import bcrypt from "bcryptjs";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import bgLibarian from "../../public/background.jpg"
import { handleClientScriptLoad } from "next/script";

type User = {
  email: string;
  password: string;
  role: string;
  adminKey?: string;
};

export default function Home() {
  const router = useRouter();

  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://localhost:44396/api/Users/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error("User not found");

      const user: User = await res.json();
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        alert("Incorrect password");
        return;
      }

      if (userType === "Admin") {
        if (!adminKey || adminKey !== user.adminKey) {
          alert("Invalid admin key");
          return;
        }
      }

      localStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");

       if(userType === "Regular") router.push('/booklist-admin');
      else router.push("/booklist");
      
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
 
<div
  className="w-full md:block md:w-1/2 h-64 md:h-full"
  style={{
    backgroundImage: `url(${bgLibarian.src})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }}
>

</div>
    <div className="w-full md:w-1/2 h-screen overflow-y-auto bg-blue-50 flex flex-col items-center justify-center">
      <div className="w-[85%] p-3 text-center items-center justify-center align-middle">
        <p className="lg:text-4xl md:text-3xl font-bold text-blue-950">Library Management System</p>
      </div>

      <div className="justify-center items-center flex flex-col p-4 rounded shadow">
        <h1 className="lg:text-2xl md:text-xl underline p-2">Sign in to your Employee Account</h1>
        <div className="w-[80%]">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="border p-2 mb-4 bg-[#5a7191] w-full text-white"
              required
            >
              
              <option value="Regular">Regular</option>
              <option value="Admin">Admin</option>
            </select>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <label className="text-[14px] font-semibold m-0">Email:</label>
            <input
              type="email" 
              placeholder="Enter your company email"
              className="border-[#979797] border-1 p-2 w-full bg-blue-50 rounded h-[35px]"
              onChange={(e) => setEmail(e.target.value)}
              required
              >
            </input>

            <label className="text-[14px] font-semibold m-0">Password:</label>
            <input
              type="password" 
              placeholder="Enter your password"
              className="border-[#979797] border-1 p-2 w-full bg-blue-50 rounded h-[35px]"
              onChange={(e) => setPassword(e.target.value)}
              required>
            </input>

            {userType === 'Admin' && (
                <div>
                <label className="text-[14px] font-semibold m-0">Admin Key:</label>
              <input
                type="password" 
                placeholder="Enter your Admin key"
                className="border-[#979797] border-1 p-2 w-full bg-blue-50 rounded h-[35px]"
                onChange={(e) => setAdminKey(e.target.value)}
                required>
              </input>
              </div>
            )}
          

          <button
            type="submit"
            className="bg-[#5a7191] text-white px-4 py-2 rounded hover:bg-blue-900"
            onClick={handleSubmit}
            >
            Submit
          </button>
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

  );
}
