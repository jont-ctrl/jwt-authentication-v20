import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import verifyJWT from './middleware/verifyJWT.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [];

app.get('/', (req, res) => {
  res.send('Hello, Express');
});

app.get('/users', (req, res) => {
  res.status(200).json({ users });
});

app.post('/create-user', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    username: username,
    password: hashedPassword,
  });

  res.status(201).json({ message: `Användare regristrerad. ${username}` });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ error: 'Fel användarnamn' });
  }

  const isPwMatch = await bcrypt.compare(password, user.password);
  if (!isPwMatch) {
    return res.status(401).json({ error: 'Fel lösenord' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

app.get('/public', verifyJWT, (req, res) => {
  res.json({ message: 'Denna nås av alla' });
});

app.get('/private', verifyJWT, (req, res) => {
  res.json({ message: `Denna av bara rätt användare. ${req.userusername}` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
