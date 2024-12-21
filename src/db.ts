require("dotenv").config();
import { Pool } from "pg";
import { BookStatus } from "./app/add-books/page";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
});

export default pool;

export interface Book {
    id: number;
    title: string;
    author: string;
    status: BookStatus;
}
