"use client";
import { useRouter } from 'next/navigation';
export default function Explore(){
    const router = useRouter();
    return <>
    <div className={`flex items-center justify-center h-screen bg-gray-100 {lemonada.className}`}>
        <div className="flex flex-col items-center justify-center m-3 mb-20 p-10 w-[95%] max-w-6xl h-[70vh] bg-[#BCD5E9] rounded-3xl text-center">
            <div className="h-[40%]">
                <h2 className="text-3xl">Hi, User1</h2>
                <h3 className="text-2xl">What whould you like to do today?</h3>
            </div>

            <div className="h-[50%] space-x-12 w-full flex flex-row items-center justify-center">
                <button 
                onClick={() => router.push("/entry-list")}
                className="text-2xl border-black border-1 rounded-[8px] px-5 h-[80%] w-[25%] bg-[#E9EEF6] hover:bg-[#a3bce6]">Write in my journal</button>
                <button 
                onClick={() => router.push("/book-list")}
                className="text-2xl border-black border-1 rounded-[8px] px-3 h-[80%] w-[25%] bg-[#E9EEF6] hover:bg-[#a3bce6]">Update my book progress</button>
                <button 
                onClick={() => router.push("/gallery")}
                className="text-2xl border-black border-1 rounded-[8px] px-3 h-[80%] w-[25%] bg-[#E9EEF6] hover:bg-[#a3bce6]">Get my daily art prompt</button>
            </div>

            <div className="h-[10%]">
                <button 
                onClick={() => router.push("/shop")}
                className="text-xl border-black border-1 rounded-[8px] p-1 bg-[#E9EEF6] hover:bg-[#a3bce6]">Shop</button>
            </div>
        </div>
    </div>
    </>
}