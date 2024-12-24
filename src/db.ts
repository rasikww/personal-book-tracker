import { config } from "dotenv";
import { Pool } from "pg";

config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
});

export default pool;
