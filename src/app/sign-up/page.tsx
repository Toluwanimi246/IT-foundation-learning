  "use client";
  import { useRouter } from 'next/navigation';
  import { useState, useEffect} from "react";
  import bcrypt from "bcryptjs";
  import bgLibarian from "../../../public/background.jpg"

  type User = {
  email: string;
  password: string;
  role: string;
  adminKey?: string;
  };

  export default function SignUp() {

  const router = useRouter(); 
  const handleSignIn = () => {
   router.push('/');
 }
  const [userType, setUserType] = useState("Regular");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://localhost:44396/api/Users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }
  
    if (!password) {
      alert("Password is required");
      return;
    }
    
    if (userType === 'Admin') {
      if (!adminKey) {
      alert("Admin key is required");
      return;
    }
  }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({
      email,
      password: hashedPassword,
      role: userType,
      adminKey: userType === "Admin" ? adminKey : null
    });

     const user = {
    email,
    role: userType,
    adminKey: userType === "Admin" ? adminKey : null
  };

    const res = await fetch('https://localhost:44396/api/Users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  email,
      password: hashedPassword,
      role: userType,
      adminKey: userType === "Admin" ? adminKey : null
    }),
    });

    if (res.ok) {
      console.log("This is a response: ");
      setEmail("");
      setPassword("");
      setAdminKey("");
      localStorage.setItem("user", JSON.stringify(user));
      alert("Account created successfully!");


      if(userType === "Regular") router.push('/booklist');
      else router.push("/booklist-admin");

    } else {
      alert("Failed to create account.");
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
></div>
    
  <div className="w-full md:w-1/2 h-screen overflow-y-auto bg-blue-50 flex flex-col items-center justify-center">
      <div className="w-[85%] p-3 text-center items-center justify-center align-middle">
         <p className="lg:text-4xl md:text-3xl font-bold text-blue-950">Library Management System</p>
       </div>
       <div className="justify-center items-center flex flex-col p-4 shadow rounded">
         <h1 className="lg:text-2xl md:text-xl underline p-2">Create an Employee Account</h1>
         <div className="w-full">
             <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="border p-2 mb-4 bg-[#5a7191] w-full text-white">
                
                <option value="Regular" className="text-white">Regular</option>
                <option value="Admin" className="text-white">Admin</option>
            </select>
          <form className="flex flex-col space-y-2">
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

             {userType === "Admin" && (
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
  );
  }