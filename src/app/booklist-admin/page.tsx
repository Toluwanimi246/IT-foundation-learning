"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Book = {
  year: ReactNode;
  id: string;
  title: string;
  authorId: string;
  isArchived: boolean;
};

function BookList() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [year, setYear] = useState("");
  const [id, setId] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showArchived, setShowArchived] = useState(false);

  // ✅ Check if user is Admin
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!userStr || !token) {
      alert("You must be logged in to access this page.");
      router.push("/");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== "Admin") {
      alert("Access denied. Admins only.");
      router.push("/");
      return;
    }

    setIsAuthorized(true);

    fetch("https://localhost:44396/api/Books", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch books: ${errorText}`);
        }
        return res.json();
      })
      .then((data: Book[]) => setBooks(data))
      .catch((error) => {
        console.error(error);
        alert("Could not load books. You may be unauthorized.");
        router.push("/");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];
    if (!token) {
      alert("Unauthorized: No token found.");
      return;
    }

    try {
      const res = await fetch("https://localhost:44396/api/Books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, authorId, year, id }),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(msg.includes("already exists") ? "Book already exists!" : "Failed to add book.");
        return;
      }

      alert("Book added successfully!");
      setTitle("");
      setAuthorId("");
      setYear("");
      setId("");

      const updatedRes = await fetch("https://localhost:44396/api/Books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedBooks = await updatedRes.json();
      setBooks(updatedBooks);
    } catch (err) {
      console.error(err);
      alert("Error adding book.");
    }
  };

  const archivedBooks = books.filter((book) => book.isArchived);
  const visibleBooks = showArchived
    ? archivedBooks
    : books.filter((book) => !book.isArchived);

  const sortedBooks = [...visibleBooks].sort((a, b) => {
    const aVal = sortBy === "title" ? a.title : a.authorId;
    const bVal = sortBy === "title" ? b.title : b.authorId;
    return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const logOut = () => {
    localStorage.clear();
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/");
  };

  if (!isAuthorized) return null;
  return (
    <div className="w-[90%] p-3 bg-blue-50 flex flex-row space-x-1 rounded mb-3.5 border">
      <div className="w-[50%]">
        <h1 className="text-2xl font-bold mb-4 sticky">Library Books</h1>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 mb-4"
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="year">Author</option>
        </select>
        <button
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className="m-2 bg-[#5a7191] hover:bg-blue-900 text-white p-1 rounded"
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>

        <div className="overflow-y-scroll overflow-auto h-[380px]">
          <ul className="space-y-2">
            {sortedBooks.map((book) => (
              <li key={book.id} className="shadow p-2 rounded bg-white hover:bg-blue-200">
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.authorId}</p>
                <p><strong>Published:</strong> {book.year}</p>
                <p><strong>ISBN:</strong> {book.id}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <h2 className="text-xl font-bold">Add a New Book</h2>
          <div>
            <p>Title:</p>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full bg-white" required />
          </div>
          <div>
            <p>Author:</p>
            <input type="text" value={authorId} onChange={(e) => setAuthorId(e.target.value)} className="border p-2 w-full bg-white" required />
          </div>
          <div>
            <p>Year Published:</p>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="border p-2 w-full bg-white" required />
          </div>
          <div>
            <p>ISBN/ASIN:</p>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="border p-2 w-full bg-white" required />
          </div>
          <div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900">Add Book</button>
          </div>
        </form>

        {/* Archived Books Sidebar */}
        <button onClick={() => setShowArchived(!showArchived)} className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          {showArchived ? "Close Archived" : "Show Archived"}
        </button>
        <div className={`fixed top-0 right-0 h-full w-85 bg-white shadow-lg border-l transform transition-transform duration-300 ease-in-out z-40 ${showArchived ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-4 pt-6">
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

        <button className="mt-0 ml-4 h-[36px] z-50 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={logOut}>
          Log out
        </button>
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
