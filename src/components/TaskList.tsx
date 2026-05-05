import { Card } from "./ui/card";
import { useMemo } from "react";
import { useTodos } from "../hooks/useTodo";
import type { Todo } from "../lib/types";

const TaskList = () => {
  const {
    data,
    isLoading,
    error,
    handleAddTodo,
    handleDeleteTodo,
    handleUpdateTodo,
  } = useTodos();



  const todos: Todo[] = useMemo(() => {
    return data ?? [];
  }, [data]);

  if (isLoading) return <h1>Loading data in progress!</h1>;
  if (error)
    return <h1>There was an error during data fetching, please try again!</h1>;

  return (
    <div id="task-list" className="col-span-9 p-5 h-full overflow-y-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl">All tasks</h1>
        <button className="p-2 mr-5 border rounded-xl" onClick={handleAddTodo}>New task</button>
      </div>
      <input
        type="text"
        placeholder="Search for specific task"
        className="mt-8 p-2 border rounded-xl w-100"
      />
      {todos.length !== 0 ? <Card className="mt-5 p-5 ">
        <ul className="flex gap-3 flex-col">
           {todos.map((todo: Todo) => {
            return (
              <li className="p-3 border rounded-2xl flex justify-between">
                <p>{todo.text}</p>
                <div className="flex gap-3">
                  <button>Edit</button>
                  <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>: <div>There are no tasks, add new one!</div>}
    </div>
  );
};

export default TaskList;
