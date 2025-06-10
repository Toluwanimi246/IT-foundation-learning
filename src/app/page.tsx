"use client";
import bcrypt from "bcryptjs";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

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
      router.push("/books");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 m-3 p-2 shadow">
      <div className="w-[45%] p-3 text-center">
        <p className="text-5xl font-bold">Library Management System</p>
      </div>

      <div className="justify-center items-center flex flex-col">
        <h1 className="text-4xl">LOGIN</h1>
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="border p-2 mb-4 bg-[#b7eeff]"
            required
          >
            
            <option value="Regular">Regular</option>
            <option value="Admin">Admin</option>
          </select>

          <label>Email:</label>
          <input
            type="email"
            className="border p-2 w-full bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            className="border p-2 w-full bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {userType === 'Admin' && (
            <>
              <label>Admin Key:</label>
              <input
                type="password"
                className="border p-2 w-full bg-white"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="border m-2 p-2 flex flex-col items-center rounded bg-[#b7eeff]">
        <h1>Or Sign up here</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
