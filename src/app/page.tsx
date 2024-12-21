"use client";
import { BookCard } from "@/components/ui/book-card";
import { Book } from "@/db";
import { use, useEffect, useState } from "react";
import { BookData, BookStatus } from "./add-books/page";
import axios from "axios";

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [EditBook, setEditBook] = useState<BookData | null>(null);
    const [FormData, setFormData] = useState<BookData>({
        title: "",
        author: "",
        description: "",
        isbn: "",
        publishedYear: "",
        totalPages: 0,
        bookmarkedPage: 0,
        status: BookStatus.TO_READ,
    });

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
