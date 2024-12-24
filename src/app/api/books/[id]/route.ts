import pool from "@/db";
import { Book } from "@/types/books";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const url = req.url;
    const id = url.split("/").pop();

    try {
        const { rows } = await pool.query<Book>(
            "DELETE FROM book WHERE id = $1 RETURNING *",
            [id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "Book not found" });
        }

        return NextResponse.json({ message: "Book deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export async function PUT(req: Request) {
    // const url = req.url;
    // const id = url.split("/").pop();

    const body = await req.json();
    try {
        const { id, title, author, bookmarked_page, status, total_pages } =
            body;

        const fields = [
            id && `id = ${id}`,
            title && `title = '${title}'`,
            author && `author = '${author}'`,
            bookmarked_page && `bookmarked_page = ${bookmarked_page}`,
            status && `status = '${status}'`,
            total_pages && `total_pages = ${total_pages}`,
        ]
            .filter(Boolean)
            .join(", ");

        const { rows } = await pool.query(
            `UPDATE book SET ${fields} WHERE id = $1 RETURNING *`,
            [id]
        );
        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}
