import pool, { Book } from "@/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const url = req.url;
    const id = url.split("/").pop();
    console.log("id", id);

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

// export async function DELETE(req: Request) {
//     const url = req.url;
//     const id = url.split("/").pop();
//     console.log("id", id);
//     try {
//         const { rows } = await pool.query<Book>(
//             "DELETE FROM books WHERE id = $1 RETURNING *",
//             [id]
//         );

//         if (rows.length === 0) {
//             return NextResponse.json({ error: "Book not found" });
//         }

//         return NextResponse.json({ message: "Book deleted successfully" });
//     } catch (error) {
//         return NextResponse.json({ error: (error as Error).message });
//     }
// }
