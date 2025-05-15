import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const user = { id: 123, username: 'test', password: '123' };

const pwTest = await bcrypt.hash('testas', 10);
console.log(pwTest);

app.get('/', (req, res) => {
  res.send('Hello, Express');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    res.status(401).json({ error: 'Fel användarnamn' });
  }

  if (password !== user.password) {
    res.status(401).json({ error: 'Fel password' });
  }

  const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
