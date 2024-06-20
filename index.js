const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    res.send(`Database time: ${result.rows[0].now}`);
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
