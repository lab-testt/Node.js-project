const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.send(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
