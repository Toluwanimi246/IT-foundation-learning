import Link from "next/link";

export default function Dashboard(){

    return(
        <nav className="bg-[#4DBBBB] shadow-md p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-5xl text-blue-600 font-bold">C</div>
          <div>
            <p>User 1</p>
          </div>
          <ul className="flex gap-6 text-gray-700">
            <li className="p-2">
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li className="p-2">
              <Link href="/explore" className="hover:text-white">Explore</Link>
            </li>
            <li className="p-2">
              <Link href="/stats" className="hover:text-white">Stats</Link>
            </li>
            <li className="p-2">
              <Link href="/profile" className="hover:text-white">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}