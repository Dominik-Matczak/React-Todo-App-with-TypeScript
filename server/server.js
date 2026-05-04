import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete('/todos', (req, res) => {
  todos = todos.filter((todo) => todo.id !== req.body.id);
  res.status(200).json({ message: "Deleted" });
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});