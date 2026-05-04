import { useMemo } from "react";
import { useTodos } from "./hooks/useTodo"
import type { Todo } from "./lib/types";

const App = () => {

  const { data, isLoading, error, handleAddTodo, handleDeleteTodo } = useTodos();

  const todos: Todo[] = useMemo(() => {
    return data ?? []
  }, [data])
  
  if (isLoading) return <h1>Trwa ładowanie danych!</h1>
  if (error) return <h1>Błąd podczas pobierania danych!</h1>

  return <>
    <ul>
    {todos.map((todo: Todo) => (
      <li key={todo.id}>{todo.text} <button onClick={() => handleDeleteTodo(todo)}>Delete Todo!</button></li>
    ))}
  </ul>
  <button onClick={handleAddTodo}>Add predefined todo</button>
  </>
}

export default App

