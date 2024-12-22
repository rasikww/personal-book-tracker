import pool, { Book } from "@/db";
import exp from "constants";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { rows } = await pool.query("SELECT * FROM book");
        return NextResponse.json(rows);
    } catch (error) {
        NextResponse.json({ error: (error as Error).message });
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    try {
        const {
            title,
            author,
            description,
            isbn,
            publishedYear,
            totalPages,
            bookmarkedPage,
            status,
        } = body;

        const { rows } = await pool.query(
            `INSERT INTO book (
            title,
            author,
            description,
            isbn,
            published_year,
            total_pages,
            bookmarked_page,
            status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                title,
                author,
                description,
                isbn,
                publishedYear,
                totalPages,
                bookmarkedPage,
                status,
            ]
        );
        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}
