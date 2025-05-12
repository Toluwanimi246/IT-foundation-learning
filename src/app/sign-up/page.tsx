'use client';
import { Julius_Sans_One } from 'next/font/google';
import { useRouter } from 'next/navigation';

const julius = Julius_Sans_One({
  subsets: ['latin'],
  weight: '400', // this font only has 400
});


import { useRef, useState } from 'react';

export default function SignUp(){
    const router = useRouter();
    const handleClick = () => {router.push("/explore")}
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
  
    const handleUploadClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleRemove = () => {
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    return <>
    <div className={`flex items-center justify-center h-screen bg-gray-100 ${julius.className}`}>
    <div className="flex flex-row items-center space-x-15 justify-center m-3 mb-5 p-6 w-[75%] max-w-6xl h-[80%] bg-[#BCD5E9] rounded-2xl">
    <div className="bg-gray-200 w-[45%] h-[95%]"> picture</div>

    <div className="bg-[#D6E5F3] w-[45%] h-[95%] flex flex-col p-4 rounded-2xl shadow">
        <div className="text-center text-3xl underline">
            <h1>Sign Up</h1>
        </div>
        <div >
            <form className="flex flex-col">
                <label>First Name</label>
                <input type="text" required className="bg-gray-100 border-black border-1 rounded-[10px] w-[80%]"></input>
                <label>Surname</label>
                <input type="text" required className="bg-gray-100 border-black border-1 rounded-[10px] w-[80%]"></input>
                <label>Email</label>
                <input type="email" required className="bg-gray-100 border-black border-1 rounded-[10px] w-[80%]"></input>
            </form>
        </div>
        <div className="flex flex-row mt-4">
            <div className="flex flex-col">
                <label>Profile Picture</label>
                {preview ? (
        <img
          src={preview}
          alt="Uploaded preview"
          className="h-20 w-25 object-cover border-3 border-dashed border-blue-300 rounded-[10px]" // Change to 'rounded-full' for circle
        />
      ) : (
        <label className="bg-blue-200 bg-opacity-55 border-3 border-dashed border-white h-20 w-25 rounded-[10px]"></label>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
            </div>
            <div className="flex flex-col">
                <button className="border-black border-1 rounded-[8px] px-3 bg-[#E9EEF6] mt-6 hover:bg-[#a3bce6]" onClick={handleUploadClick}> {preview ? 'Change' : 'Upload'}</button>
                {preview && (
          <button
            onClick={handleRemove}
            className="border-black border-1 rounded-[8px] px-3 bg-[#E9EEF6] mt-auto hover:bg-[#a3bce6]"          >
            Remove
          </button>
        )}
            </div>

        </div>
        <div className="flex justify-center items-center h-[30%]">
            <button 
            onClick= {handleClick}
            className="border-black border-1 rounded-[8px] px-3 w-[75%] mt-auto bg-[#E9EEF6] hover:bg-[#a3bce6]">Submit</button>
        </div>
    </div>

  </div>
</div>
</>
}