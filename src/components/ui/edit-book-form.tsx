"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import axios from "axios";
import { Book } from "@/db";
import React from "react";
import { DropdownMenuRadioGroupBookStatus } from "./dropdown-radio-book-status";

export function EditBookForm({ book }: { book: Book }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: book.id,
        title: book.title,
        author: book.author,
        bookmarkedPage: book.bookmarkedPage,
        status: book.status,
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
            // const response = await fetch(`/api/books/${id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //     throw new Error("Failed to update book");
            // }

            const response = await axios.put(`/api/books/${book.id}`, formData);
            if (response.status !== 200) {
                throw new Error("Failed to update book");
            }

            // Refresh the page data
            router.refresh();
        } catch (error) {
            console.error("Error updating book:", error);
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

            {/* <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Book description"
                    className="min-h-[100px]"
                />
            </div> */}

            <div className="space-y-2">
                <DropdownMenuRadioGroupBookStatus bookStatus={book.status} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="bookmarkedPage">Current Bookmarked Page</Label>
                <Input id="bookmarkedPage"></Input>
            </div>

            <div className="flex justify-end gap-4">
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
