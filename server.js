import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const pwTest = await bcrypt.hash('testa', 10);
console.log(pwTest);

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
