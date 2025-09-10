  "use client";
  import { useRouter, useSearchParams } from 'next/navigation';
  import { useState, useEffect} from "react";
  import bcrypt from "bcryptjs";
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

  type User = {
  email: string;
  password: string;
  username: string;
  };

  export default function SignUp() {

  const router = useRouter(); 
  const handleSignIn = () => {
   router.push('/sign-in');
 }

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://localhost:44372/api/Users/register")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

    const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     if (!username) {
      alert("Username is required");
      return;
    }

    if (!email) {
      alert("Email is required");
      return;
    }
  
    if (!password) {
      alert("Password is required");
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({
      email,
      username,
      password: hashedPassword
    });

    const user = {
        email
    };

    const res = await fetch('https://localhost:44372/api/Users/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  email, username,
      password: hashedPassword
      
    }),
    });
        
    if (res.ok) {
      console.log("This is a response: ");
      setEmail("");
      setPassword("");

      localStorage.setItem("user", JSON.stringify(user));
      alert("Account created successfully!");
      router.push(redirectPath);


    } else {
      const errorMsg = await res.text(); 
      alert("Failed to create account: " + errorMsg);
    }

    };

  return (
    <div>
      <Navbar/>
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
 
    <div
    className="w-full md:block md:w-1/2 h-64 md:h-full">
      <img src = "/background.jpg"
          className="w-full h-full object-cover" 
          alt="background photo">
        </img>
    </div>
    
  <div className="w-full md:w-1/2 h-screen overflow-y-auto flex flex-col items-center justify-center">
      <div className="w-[85%] p-3 text-center items-center justify-center align-middle">
         <p className="lg:text-4xl md:text-3xl font-bold text-blue-950">Create Sphere</p>
       </div>
       <div className="justify-center items-center flex flex-col p-8 shadow rounded">
         <h1 className="lg:text-2xl md:text-xl underline p-2">Create a new Create Sphere Account</h1>
         <div className="w-full">
             
          <form className="flex flex-col space-y-2">
            <label className="text-[14px] font-semibold m-0">Username:</label>
            <input
            type="text" 
            placeholder="Enter your username"
            className="border-[#979797] border-1 p-2 w-full rounded h-[35px]"
            onChange={(e) => setUsername(e.target.value)}
            required
            >
            </input>

            <label className="text-[14px] font-semibold m-0">Email:</label>
            <input
            type="email" 
            placeholder="Enter your company email"
            className="border-[#979797] border-1 p-2 w-full rounded h-[35px]"
            onChange={(e) => setEmail(e.target.value)}
            required
            >
            </input>

            <label className="text-[14px] font-semibold m-0">Password:</label>
            <input
            type="password"
            placeholder="Enter your password" 
            className="border-[#979797] border-1 p-2 w-full rounded h-[35px]"
            onChange={(e) => setPassword(e.target.value)}
            required>
            </input>

             

            <button type="submit" 
            className="bg-[#5a7191] text-white px-4 py-2 rounded hover:bg-blue-900"
            onClick={handleSubmit}
            >Submit</button>
          </form>
        </div>

        <div className="m-2">
        <p>
            Already have an account?{" "}
          <span
            className="cursor-pointer font-semibold"
            style={{ color: "#5a7191" }}
            onClick={handleSignIn}
            >
            Log in
          </span>
        </p>
        </div>
      </div>
        </div>
    </div>
    <Footer/>
    </div>
  );
}