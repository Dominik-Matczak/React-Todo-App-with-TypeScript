import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../lib/types";

export function useTodos() {

  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("http://localhost:3000/todos")
        .then((res) => res.json())
        .then((data) => {
          console.log('Fetched data:', data);
          return data;
        }),
  });

  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (newTodo) => 
      fetch('http://localhost:3000/todos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
      }).then((res) => res.json()),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"]
        })
        console.log("Invalidated")
      }
  })

  const deleteTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo) => 
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
      }).then((res) => res.json()),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"]
        })
      }
  })

  const updateTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo) => 
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
      }).then((res) => res.json()),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"]
        })
      }
  })

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: "Predefined Todo",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    addTodo.mutate(newTodo);
  };

  const handleDeleteTodo = (todo: Todo) => {
  deleteTodo.mutate(todo);
  console.log("Deleting!")
};

const handleUpdateTodo = (todo: Todo) => {
  updateTodo.mutate({
    ...todo,
  });
  console.log("Updating!")
}



  return {...todosQuery, handleAddTodo, handleDeleteTodo, handleUpdateTodo};
}