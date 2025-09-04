"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { BiSearchAlt2 } from "react-icons/bi";
import { BiMedal } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoLinkedin } from "react-icons/bi";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { BiSolidChevronDown } from "react-icons/bi";

export default function Navbar() {
                
    const router = useRouter();
    const handleAbout = () => {
        router.push('/about');
    } 
     
    const handleHome = () => {
        router.push('/');
    } 
    const [showCategory, setShowCategory] = useState(false);
    const handleCategory = () => {
        if(!showCategory) setShowCategory(true)
            else setShowCategory(false);
    }
    return (
        <div className="sticky">
            <div className="flex flex-row justify-between p-4 shadow bg-[#e7e7e7]">
                <div className="flex flex-row space-x-5">
                    <div><BiSearchAlt2 className="w-8 h-8"/></div>
                    <div className="pt-2 font-bold hover:text-cyan-900 hover:cursor-pointer" onClick={handleAbout}>About</div>
                    <div className="pt-2 font-bold flex flex-row hover:text-cyan-900 hover:cursor-pointer" onClick={handleCategory}>Categories<span className="pt-1"><BiSolidChevronDown /></span></div>
                </div>

                <div className="hover:text-cyan-900 hover:cursor-pointer" onClick={handleHome}><BiMedal className="w-10 h-10"/></div>

                <div className="flex flex-row space-x-5">
                    <div><BiLogoInstagram className="w-8 h-8"/></div>
                    <div><BiLogoLinkedin className="w-8 h-8"/></div>
                    <div><BiLogoFacebookCircle className="w-8 h-8"/></div>
                </div>
            </div>
            {showCategory && (<div className="flex flex-row p-3 space-x-12 font-bold border-1 border-black bg-[#e7e7e78c] z-10">
                <div className="hover:cursor-pointer" onClick={() => {router.push('/category/writing')}}>Writing</div>
                <div className="hover:cursor-pointer" onClick={() => {router.push('/category/illustration')}}>Illustration</div>
                <div className="hover:cursor-pointer" onClick={() => {router.push('/category/animation')}}>Animation</div>
                <div className="hover:cursor-pointer" onClick={() => {router.push('/category/featured')}}>Featured</div>
            </div>)}
        </div>
    );
}
