"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type Book = {
  year: ReactNode;
  id: string;
  title: string;
  authorId: string;
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
  

  const sortedBooks = [...books].sort((a, b) => {
  if (sortBy === "title") {
    return a.title.localeCompare(b.title);
  } else if (sortBy === "year") {
    return Number(a.year) - Number(b.year);
  }
  return 0;
});


  return (
    
    <div className="w-[90%] p-3 bg-blue-50 flex flex-row space-x-1 rounded mb-3.5 border">
      <div className="w-[50%]">
        <h1 className="text-2xl font-bold mb-4 sticky">Library Books</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 mb-4"
          >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="year">Year Published</option>
        </select>
        <div className="overflow-y-scroll overflow-auto h-[60%]  border">
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
      </div>
      </div>

    </div>
  );
}

export default function Books() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[45%] p-3 text-center">
        <h1 className="text-3xl font-bold">Library Management System</h1>
      </div>
      <BookList />
    </div>
  );
}