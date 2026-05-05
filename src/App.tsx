import { useMemo } from "react";
import { useTodos } from "./hooks/useTodo"
import type { Todo } from "./lib/types";

const App = () => {

  const { data, isLoading, error, handleAddTodo, handleDeleteTodo, handleUpdateTodo } = useTodos();

  const todos: Todo[] = useMemo(() => {
    return data ?? []
  }, [data])
  
  if (isLoading) return <h1>Loading data in progress!</h1>
  if (error) return <h1>There was an error during data fetching, please try again!</h1>

  return <>
    <ul>
    {todos.map((todo: Todo) => (
      <li key={todo.id}>{todo.text} {JSON.stringify(todo.completed)} <button onClick={() => handleDeleteTodo(todo)}>Delete Todo!</button><button onClick={() => handleUpdateTodo({...todo, completed:!todo.completed})}>{!todo.completed ? "Finish" : "Uncheck"} Todo!</button> <button>Change task text to - Changed predifined</button></li>
    ))}
  </ul>
  <button onClick={handleAddTodo}>Add predefined todo</button>
  </>
}

export default App

