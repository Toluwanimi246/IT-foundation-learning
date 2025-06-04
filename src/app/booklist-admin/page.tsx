"use client";
import { ReactNode, useEffect, useState } from "react";

type Book = {
  year: ReactNode;
  id: string;
  title: string;
  authorId: string;
};

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("https://localhost:44396/api/Books")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data));
  }, []);

  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [year, setYear] = useState("");
  const [id, setId] = useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('https://localhost:44396/api/Books', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, authorId, year, id}),
    });

    if (res.ok) {
      setTitle("");
      setAuthorId("");
      setYear("");
      alert("Book added successfully!");

      const updatedRes = await fetch('https://localhost:44396/api/Books');
    const updatedBooks = await updatedRes.json();
    setBooks(updatedBooks);
    } else {
      alert("Failed to add book.");
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
  if (sortBy === "title") {
    return a.title.localeCompare(b.title);
  } else if (sortBy === "year") {
    return Number(a.year) - Number(b.year);
  }
  return 0;
});


  return (
    
    <div className="w-[90%] p-3 bg-blue-100 flex flex-row space-x-1 rounded mb-3.5 border">
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

        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <h2 className="text-xl font-bold">Add a New Book</h2>
            <div className="w-full">
              <p>Title:</p>
              <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full bg-white"
              required
            />
            </div>
            <div>
              <p>Author:</p>
              <input
              type="text"
              placeholder="Author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="border p-2 w-full bg-white"
              required
            />
            </div>

            <div>
            <p>Year Published:</p>
            <input
            type="number"
            placeholder="Year Published"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 w-full bg-white"
            required
            />
            </div>

            <div className="w-full">
              <p>ISBN/ASIN</p>
              <input
              type="text"
              placeholder="ISBN/ASIN"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border p-2 w-full bg-white"
              required
            />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900">
              Add Book
            </button>
          </form>
        </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[45%] p-3 text-center">
        <h1 className="text-3xl font-bold">Library Management System</h1>
      </div>
      <BookList />
    </div>
  );
}
