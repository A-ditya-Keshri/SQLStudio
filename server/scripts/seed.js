import 'dotenv/config';
import mongoose from 'mongoose';
import pkg from 'pg';
const { Pool } = pkg;
import Assignment from '../models/Assignment.js';

const assignments = [
    {
        title: "Retrieve All Products",
        description: "Learn how to select all columns and rows from a table.",
        difficulty: "Easy",
        question: "Write a query to retrieve all information from the 'products' table.",
        schemaDescription: "Table: products. Columns: id (INT), name (TEXT), price (DECIMAL), stock (INT)",
        sampleData: [
            {
                tableName: "products",
                data: [
                    { id: 1, name: "Laptop", price: 999.99, stock: 50 },
                    { id: 2, name: "Mouse", price: 25.00, stock: 150 },
                    { id: 3, name: "Keyboard", price: 45.00, stock: 80 }
                ]
            }
        ],
        solutionQuery: "SELECT * FROM products;",
        hintKeywords: ["SELECT", "*", "FROM", "products"]
    },
    {
        title: "Filter High-Priced Products",
        description: "Learn how to use the WHERE clause to filter data.",
        difficulty: "Easy",
        question: "Write a query to find all products with a price greater than 50.",
        schemaDescription: "Table: products. Columns: id (INT), name (TEXT), price (DECIMAL), stock (INT)",
        solutionQuery: "SELECT * FROM products WHERE price > 50;",
        hintKeywords: ["WHERE", "price", ">"]
    }
];

async function seed() {
    // 1. Seed MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        await Assignment.deleteMany({});
        await Assignment.insertMany(assignments);
        console.log('MongoDB Seeded');
    } catch (err) {
        console.error('MongoDB Seed Error:', err);
    } finally {
        await mongoose.disconnect();
    }

    // 2. Seed PostgreSQL Sandbox
    const pool = new Pool({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT,
    });

    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL');

        // Create tables and insert data for the first assignment
        await client.query(`
      DROP TABLE IF EXISTS products;
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name TEXT,
        price DECIMAL,
        stock INT
      );
      INSERT INTO products (name, price, stock) VALUES
      ('Laptop', 999.99, 50),
      ('Mouse', 25.00, 150),
      ('Keyboard', 45.00, 80);
    `);

        console.log('PostgreSQL Sandbox Seeded');
        client.release();
    } catch (err) {
        console.error('PostgreSQL Seed Error:', err);
    } finally {
        await pool.end();
    }
}

seed();
