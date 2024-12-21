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
            published_year,
            total_pages,
            bookmarked_page,
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
                published_year,
                total_pages,
                bookmarked_page,
                status,
            ]
        );
        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
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
        } = body;

        const fields = [
            title && `title = '${title}'`,
            author && `author = '${author}'`,
            description && `description = '${description}'`,
            isbn && `isbn = '${isbn}'`,
            published_year && `published_year = ${published_year}`,
            total_pages && `total_pages = ${total_pages}`,
            bookmarked_page && `bookmarked_page = ${bookmarked_page}`,
            status && `status = '${status}'`,
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

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     switch (req.method) {
//         case "GET":
//             try {
//                 const { rows } = await pool.query("SELECT * FROM book");
//                 res.status(200).json(rows);
//             } catch (error) {
//                 res.status(500).json({ error: (error as Error).message });
//             }
//             break;

//         case "POST":
//             try {
//                 const {
//                     title,
//                     author,
//                     description,
//                     isbn,
//                     published_year,
//                     total_pages,
//                     bookmarked_page,
//                     status,
//                 } = req.body;
//                 const { rows } = await pool.query(
//                     `INSERT INTO books (
//                     title,
//                     author,
//                     description,
//                     isbn,
//                     published_year,
//                     total_pages,
//                     bookmarked_page,
//                     status
//                     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
//                     [
//                         title,
//                         author,
//                         description,
//                         isbn,
//                         published_year,
//                         total_pages,
//                         bookmarked_page,
//                         status,
//                     ]
//                 );
//                 res.status(201).json(rows[0]);
//             } catch (error) {
//                 res.status(500).json({ error: (error as Error).message });
//             }
//             break;

//         case "PUT":
//             try {
//                 const {
//                     id,
//                     title,
//                     author,
//                     description,
//                     isbn,
//                     published_year,
//                     total_pages,
//                     bookmarked_page,
//                     status,
//                 } = req.body;

//                 const { rows } = await pool.query(
//                     `UPDATE books SET
//                     title = $1,
//                     author = $2,
//                     description = $3,
//                     isbn = $4,
//                     published_year = $5,
//                     total_pages = $6,
//                     bookmarked_page = $7,
//                     status = $8
//                     WHERE id = $9 RETURNING *`,
//                     [
//                         title,
//                         author,
//                         description,
//                         isbn,
//                         published_year,
//                         total_pages,
//                         bookmarked_page,
//                         status,
//                         id,
//                     ]
//                 );
//                 res.status(200).json(rows[0]);
//             } catch (error) {
//                 res.status(500).json({ error: (error as Error).message });
//             }
//         case "DELETE":
//             try {
//                 const { id } = req.query;
//                 const { rows } = await pool.query<Book>(
//                     "DELETE FROM books WHERE id = $1 RETURNING *",
//                     [id]
//                 );

//                 if (rows.length === 0) {
//                     return res.status(404).json({ error: "Book not found" });
//                 }

//                 res.status(200).json({ message: "Book deleted successfully" });
//             } catch (error) {
//                 res.status(500).json({ error: (error as Error).message });
//             }
//             break;

//         default:
//             res.status(405).json({ error: "Method not allowed" });
//     }
// }
