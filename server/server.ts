import express, { Request, Response } from "express";
import cors from "cors";
import { Todo } from "../src/lib/types";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos: Todo[] = [];

app.get("/todos", (_req: Request, res: Response) => {
  res.json(todos);
});

app.post("/todos", (req: Request, res: Response) => {
  const todo = req.body;

  todos.push(todo);

  res.status(201).json(todo);
});

app.delete("/todos/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const exists = todos.some((todo) => todo.id === id);

  if (!exists) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos = todos.filter((todo) => todo.id !== id);

  res.status(200).json({ message: "Deleted" });
});

app.patch(
  "/todos/:id",
  (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;

    const todoToPatch = todos.find((todo) => todo.id === id);

    if (!todoToPatch) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (req.body.text !== undefined) {
      todoToPatch.text = req.body.text;
    }

    if (req.body.completed !== undefined) {
      todoToPatch.completed = req.body.completed;
    }

    res.status(200).json(todoToPatch);
  },
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
