"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
  import bgLibarian from "../../../public/background.jpg"


type Book = {
  year: ReactNode;
  id: string;
  title: string;
  authorId: string;
  isArchived: boolean;
};

type User = {
  email: string;
  password: string;
  role: string;
  adminKey?: string;
};

function BookList() {
const router = useRouter();
     useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
    }
  }, []);

  const [books, setBooks] = useState<Book[]>([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("https://localhost:44396/api/Books")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data));
  }, []);
const [showArchived, setShowArchived] = useState(false);
   const archivedBooks = books.filter(book => book.isArchived);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
 const visibleBooks = showArchived
  ? books.filter(book => book.isArchived)
  : books.filter(book => !book.isArchived);

const sortedBooks = [...visibleBooks].sort((a, b) => {
  const aVal = sortBy === "title" ? a.title : a.authorId;
  const bVal = sortBy === "title" ? b.title : b.authorId;

  return sortOrder === "asc"
    ? aVal.localeCompare(bVal)
    : bVal.localeCompare(aVal);
});

  const logOut = () => {
    localStorage.clear();
    router.push("/")
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

      <div className="w-full md:w-1/2 bg-blue-50 p-3">
      <div className="w-[90%] h-screen">
        <h1 className="text-3xl font-bold mb-4 sticky">Library Books</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 mb-4"
          >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <button onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}
        className="m-2 bg-[#5a7191]  hover:bg-blue-900 text-white p-1 rounded">
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
        <div className="overflow-y-scroll overflow-auto h-[60%] border">
          <ul className="space-y-2">
            {sortedBooks.map((book) => (
            <li key={book.id} className="shadow p-2 rounded bg-white hover:bg-blue-200">
              <p>
                <strong>Title:</strong> {book.title}
              </p>
              <p>
                <strong>Author:</strong> {book.authorId}
              </p>
              <p>
                <strong>Published:</strong> {book.year}
              </p>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
          {showArchived ? "Close Archived" : "Show Archived"}
        </button>
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l transform transition-transform duration-300 ease-in-out z-40 ${
            showArchived ? "translate-x-0" : "translate-x-full"
          }`}
        >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Archived Books</h2>
          {archivedBooks.length === 0 ? (
            <p className="text-gray-500">No archived books.</p>
          ) : (
            <ul className="space-y-2">
              {archivedBooks.map((book) => (
                <li key={book.id} className="text-sm text-gray-600">
                  <strong>{book.title}</strong> by {book.authorId}
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>

      </div>
      <button
      className="z-50 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      onClick={logOut}
      >Log out</button>

      </div>
      </div>
   </div>
  );
}

export default function Books() {
  return (
        <BookList />
  );
}