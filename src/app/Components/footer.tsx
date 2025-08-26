import Link from "next/link";
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi";

export default function Footer() {
return(
    <div className="grid md:grid-cols-3 gap-10 my-20 pr-12 pt-15 border-t">
        <div className="text-5xl font-bold pr-20 pl-30 justify-center items-center">
            <h1>Create</h1>
            <h1 className="pl-18">Sphere</h1>
        </div>
        
        <div className=" flex space-x-10 justify-center text-xl p-3 items-center">
            <Link href="/about" className="px-3">About</Link>
            <Link href="/contact" className="px-3">Contact</Link>
            <Link href="/privacy" className="px-3">Privacy</Link>
        </div>

        <div className="flex flex-row items-center justify-center space-x-5 border-l">
            <div><BiLogoInstagram className="w-10 h-10"/></div>
            <div><BiLogoLinkedin className="w-10 h-10"/></div>
            <div><BiLogoFacebookCircle className="w-10 h-10"/></div>
            </div>
        </div>
)
}