
const handleSubmit = () => { }

export default function Home() {
  return (<>
   <div className="flex flex-row items-center h-full">
      <div className="w-[45%] p-3 text-center items-center justify-center align-middle">
        <p className="text-5xl font-bold">Library Management System</p>
      </div>
      <div className="justify-center items-center flex flex-col">
        <h1 className="text-4xl">LOGIN</h1>
        <div >
          <form className="flex flex-col space-y-2">
            <label>Email:</label>
            <input 
            type="email" 
            className="border p-2 w-full bg-white"
            required>
            </input>

            <label>Password:</label>
            <input
            type="password" 
            className="border p-2 w-full bg-white"
            required>
            </input>

            <button type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
