import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [{id: "1",
    text: "zadanie 1: pobierz dane",
    completed: true,
    createdAt: "today",
    important: false},
{id: "2",
    text: "zadanie 2: załaduj je na strone",
    completed: true,
    createdAt: "today",
    important: false}];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});