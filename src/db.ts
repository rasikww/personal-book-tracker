import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import { BookStatus } from "./app/add-books/page";
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
});

export interface Book {
    id: number;
    title: string;
    author: string;
    status: BookStatus;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            try {
                const { rows } = await pool.query("SELECT * FROM book");
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }
            break;

        case "POST":
            try {
                const {
                    title,
                    author,
                    description,
                    isbn,
                    published_year,
                    total_pages,
                    bookmarked_page,
                    status,
                } = req.body;
                const { rows } = await pool.query(
                    `INSERT INTO books (
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
                        published_year,
                        total_pages,
                        bookmarked_page,
                        status,
                    ]
                );
                res.status(201).json(rows[0]);
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }
            break;

        case "PUT":
            try {
                const {
                    id,
                    title,
                    author,
                    description,
                    isbn,
                    published_year,
                    total_pages,
                    bookmarked_page,
                    status,
                } = req.body;

                const { rows } = await pool.query(
                    `UPDATE books SET 
                    title = $1, 
                    author = $2, 
                    description = $3, 
                    isbn = $4, 
                    published_year = $5, 
                    total_pages = $6, 
                    bookmarked_page = $7, 
                    status = $8
                    WHERE id = $9 RETURNING *`,
                    [
                        title,
                        author,
                        description,
                        isbn,
                        published_year,
                        total_pages,
                        bookmarked_page,
                        status,
                        id,
                    ]
                );
                res.status(200).json(rows[0]);
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }
        case "DELETE":
            try {
                const { id } = req.query;
                const { rows } = await pool.query<Book>(
                    "DELETE FROM books WHERE id = $1 RETURNING *",
                    [id]
                );

                if (rows.length === 0) {
                    return res.status(404).json({ error: "Book not found" });
                }

                res.status(200).json({ message: "Book deleted successfully" });
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }
            break;

        default:
            res.status(405).json({ error: "Method not allowed" });
    }
}
