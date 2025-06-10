  "use client";
  import { useRouter } from 'next/navigation';
  import { useState, useEffect} from "react";
  import bcrypt from "bcryptjs";

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
  const [userType, setUserType] = useState("");

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
    const hashedPassword = await bcrypt.hash(password, 10);

    e.preventDefault();
    const res = await fetch('https://localhost:44396/api/Users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  email,
      password,
      role: userType,
      adminKey: userType === "Admin" ? adminKey : null
    }),
    });

    if (res.ok) {
      console.log("This is a response");
      setEmail("");
      setPassword("");
      setAdminKey("");
      alert("Account created successfully!");

    } else {
      alert("Failed to create account.");
    }
  };

  return (<>
   <div className="flex flex-col items-center justify-center bg-blue-200 m-3 p-2 shadow">
      <div className="w-[45%] p-3 text-center items-center justify-center align-middle">
        <p className="text-5xl font-bold">Library Management System</p>
      </div>
      <div className="justify-center items-center flex flex-col p-1">
        <h1 className="text-4xl underline">SIGN UP</h1>
        <div>
            <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="border p-2 mb-4 bg-[#b7eeff]">
                
                <option value="Regular">Regular</option>
                <option value="Admin">Admin</option>
            </select>
          <form className="flex flex-col space-y-2">
            <label>Email:</label>
            <input
            type="email" 
            className="border p-2 w-full bg-white"
            onChange={(e) => setEmail(e.target.value)}
            required>
            </input>

            <label>Password:</label>
            <input
            type="password" 
            className="border p-2 w-full bg-white"
            onChange={(e) => setPassword(e.target.value)}
            required>
            </input>

             {userType === 'Admin' && (
              <div>
              <label>Admin Key:</label>
             <input
            type="password" 
            className="border p-2 w-full bg-white"
            onChange={(e) => setAdminKey(e.target.value)}
            required>
            </input>
            </div>
          )}

            <button type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900"
            onClick={handleSubmit}
            >Submit</button>
          </form>
        </div>
      </div>

      <div className="border m-2 p-2 flex flex-col items-center rounded bg-[#b7eeff]">
      <h1>Already have an account? Sign in!</h1>
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900"
        onClick={handleSignIn}
        >Sign In</button>
        </div>
    </div>
    </>
  );
  }