"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import axios from "axios";
import { Book } from "@/db";
import React from "react";
import { DropdownMenuRadioGroupBookStatus } from "./dropdown-radio-book-status";
import { BookStatus } from "@/app/add-books/page";

export function EditBookForm({ book }: { book: Book }) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(book.status);
    const [formData, setFormData] = useState({
        id: book.id,
        title: book.title,
        author: book.author,
        bookmarkedPage: book.bookmarked_page,
        status: book.status,
        totalPages: book.total_pages,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const updatedBook = {
                id: book.id,
                title: formData.title,
                author: formData.author,
                bookmarked_page: formData.bookmarkedPage,
                status: status,
                total_pages: formData.totalPages,
            };

            const response = await axios.put(
                `/api/books/${book.id}`,
                updatedBook
            );
            if (response.status !== 200) {
                throw new Error("Failed to update book");
            }

            // Refresh the page data
            window.location.reload();
        } catch (error) {
            alert("Failed to update book");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Book title"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    required
                />
            </div>

            <div className="space-y-2">
                <DropdownMenuRadioGroupBookStatus
                    setStatus={setStatus}
                    status={status}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="bookmarkedPage">
                    Current Bookmarked Page (Total: {book.total_pages} pages)
                </Label>

                <Input
                    id="bookmarkedPage"
                    name="bookmarkedPage"
                    type="number"
                    defaultValue={book.bookmarked_page}
                    min="1"
                    max={book.total_pages}
                    // value={formData.bookmarkedPage}
                    onChange={handleChange}
                    placeholder="Current Bookmarked Page"
                    disabled={status !== BookStatus.READING}
                ></Input>
            </div>

            <div className="flex justify-end gap-4">
                <Button
                    variant="destructive"
                    onClick={async () => {
                        if (
                            confirm(
                                "Are you sure you want to delete this book?"
                            )
                        ) {
                            const response = await axios.delete(
                                `/api/books/${book.id}`
                            );
                            window.location.reload();
                        }
                    }}
                >
                    Delete
                </Button>
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}
