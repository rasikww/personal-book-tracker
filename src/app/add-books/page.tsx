"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { BookData, BookStatus } from "@/types/books";

export default function AddBooks() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<BookData>({
        title: "",
        author: "",
        description: "",
        isbn: "",
        publishedYear: "",
        totalPages: 0,
        bookmarkedPage: 0,
        status: BookStatus.TO_READ,
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
            const response = await axios.post("/api/books", formData);
            toast.success("Book added successfully!");
            if (response.status !== 200) {
                throw new Error("Failed to add book");
            }

            // Reset form
            setFormData({
                title: "",
                author: "",
                description: "",
                isbn: "",
                publishedYear: "",
                totalPages: 0,
                bookmarkedPage: 0,
                status: BookStatus.TO_READ,
            });

            // Optionally redirect to books list
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Error adding book:", error);
            toast.error("Failed to add book. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Book</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter book title"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="author">Author *</Label>
                        <Input
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="totalPages">Total Pages *</Label>
                        <Input
                            id="totalPages"
                            name="totalPages"
                            type="number"
                            value={formData.totalPages}
                            onChange={handleChange}
                            placeholder="Enter Total Pages"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input
                                id="isbn"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                placeholder="Enter ISBN"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="publishedYear">
                                Published Year
                            </Label>
                            <Input
                                id="publishedYear"
                                name="publishedYear"
                                value={formData.publishedYear}
                                onChange={handleChange}
                                placeholder="Enter year"
                                type="number"
                                min="1000"
                                max={new Date().getFullYear()}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter book description"
                            className="min-h-[100px] w-full"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            className="hover:bg-[#4a90e2] hover:text-white"
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/")}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#4a90e2] text-white hover:bg-blue-500"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Adding..." : "Add Book"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
