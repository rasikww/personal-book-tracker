"use client";
import { BookCard } from "@/components/ui/book-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "@/types/books";

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get("/api/books");
            setBooks(response.data);
        } catch (error) {
            console.error("Failed to fetch books", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}
