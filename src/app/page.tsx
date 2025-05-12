'use client';
import { Lemonada } from 'next/font/google';
import { useRouter } from 'next/navigation';
const lemonada = Lemonada({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
export default function Home(){
  const handleClick = () => {router.push("/sign-up")}
  const router = useRouter();

  return <>
    <div className={`flex items-center justify-center h-screen bg-gray-100 ${lemonada.className}`}>
    <div className="flex flex-col items-center justify-center m-3 mb-20 p-10 w-[95%] max-w-6xl h-[70vh] bg-[#BCD5E9] rounded-3xl text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-8">Welcome to Coziate!</h1>
    <h3 className="text-2xl md:text-4xl mt-8 mb-8">Let's get you started</h3>
    <button
    onClick={handleClick}
     className="border border-black px-6 py-2 rounded-md bg-[#E9EEF6] hover:bg-[#4DBBBB] transition">BEGIN</button>
  </div>
</div>
  </>
  
}