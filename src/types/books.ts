export interface Book {
    id: number;
    title: string;
    author: string;
    bookmarked_page: number;
    status: BookStatus;
    total_pages: number;
}

export interface BookData {
    title: string;
    author: string;
    description: string;
    isbn: string;
    publishedYear: string;
    totalPages: number;
    bookmarkedPage: number;
    status: BookStatus;
}

export enum BookStatus {
    READING = "Reading",
    COMPLETED = "Completed",
    TO_READ = "To Read",
}
