"use client";

import { useState } from "react";
import bgLibarian from "../../../public/background.jpg";

export default function Order() {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [year, setYear] = useState("");
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build the payload
    const orderData = {
      bookId: id,
      title: title,
      authorId: authorId,  
      yearPublished: parseInt(year, 10),    
      quantity: parseInt(quantity, 10),
    };

    

    try {
      const response = await fetch("https://localhost:44396/api/Orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order sent successfully!");
        setTitle("");
        setAuthorId("");
        setYear("");
        setId("");
        setQuantity("");
      } else {
        alert("Failed to send order.");
      }
    } catch (error) {
      console.error("Error sending order:", error);
      alert("Error sending order.");
    }
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
      <div className="w-full md:w-1/2 h-screen overflow-y-auto bg-blue-50 flex flex-col items-center justify-center">
        <div className="w-[85%] p-3 text-center items-center justify-center align-middle">
          <p className="lg:text-4xl md:text-3xl font-bold text-blue-950">
            Library Management System
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-2xl underline text-blue-950">Order New Books</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-2">
              <label className="text-sm font-bold p-1">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded p-1 w-full bg-blue-50"
                required
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-bold p-1">Author:</label>
              <input
                type="text"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="border rounded p-1 w-full bg-blue-50"
                required
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-bold p-1">Year Published:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border rounded p-1 w-full bg-blue-50"
                required
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-bold p-1">ISBN/ASIN:</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="border rounded p-1 w-full bg-blue-50"
                required
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-bold p-1">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border rounded p-1 w-full bg-blue-50"
                required
              />
            </div>

            <div className="flex justify-center items-center mt-5">
              <button
                type="submit"
                className="bg-[#5a7191] text-white px-4 py-2 rounded hover:bg-blue-900 w-full"
              >
                Send Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
