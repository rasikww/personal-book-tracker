import { BookCard } from "@/components/ui/book-card";

async function getBooks() {
    // Fetch books from your API
    return [
        {
            id: "1",
            title: "Book 1",
            author: "Author 1",
            description: "Description 1",
        },
        {
            id: "2",
            title: "Book 2",
            author: "Author 2",
            description: "Description 2",
        },
    ];
}

export default async function Home() {
    const books = await getBooks();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}
