import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Comments() {
    const router = useRouter();

    const handleRequireLogin = () => {
    const currentPath = window.location.pathname;
        router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
    };
    
    return(
        <div className="m-15">
            <h1 className="text-4xl p-2 py-5 mt-10 underline flex justify-center">COMMENTS</h1>
            <div className="flex flex-row justify-between">
                <h2>0 Comments</h2>

                {<div className="flex flex-row space-x-1">
                    <h2>Want to drop a comment?</h2>
                    <div className="text-[#33527e] hover:cursor-pointer"
                        onClick = {() => handleRequireLogin()}>
                        Sign in
                    </div>
                </div>}
            </div>
            <div className="border-t mb-10"></div>
            <div className="flex flex-row">
                <p className="p-1 w-12 h-12 flex justify-center bg-[#d8d8d8] rounded-sm text-2xl items-center">T</p>
                <input className="w-full border p-1 m-3 rounded-sm"></input>
            </div>
            <div className="p-2">/comment list</div>
        </div>
    )
}