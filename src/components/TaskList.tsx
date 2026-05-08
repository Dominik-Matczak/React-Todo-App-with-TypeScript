import { Card } from "./ui/card";
import { useMemo, useState } from "react";
import { useTodos } from "../hooks/useTodo";
import type { Todo } from "../lib/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPen,
  faTrash,
  faCheck,
  faFloppyDisk,
  faPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const TaskList = () => {
  const {
    data,
    isLoading,
    error,
    handleAddTodo,
    handleDeleteTodo,
    handleUpdateTodo,
  } = useTodos();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");

  const todos: Todo[] = useMemo(() => {
    return data ?? [];
  }, [data]);

  if (isLoading)
    return (
      <h1 className="text-2xl flex items-center justify-center h-full">
        Loading...
      </h1>
    );

  if (error)
    return (
      <h1 className="text-2xl flex items-center justify-center h-full">
        Error while fetching tasks
      </h1>
    );

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditedText(todo.text);
  };

  const saveChanges = (todo: Todo) => {
    handleUpdateTodo({
      ...todo,
      text: editedText,
    });

    setEditingId(null);
    setEditedText("");
  };

  return (
    <div
      id="task-list"
      className="col-span-9 p-8 h-full overflow-y-auto bg-white"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">All Tasks</h1>
          <p className="text-slate-500 mt-1">Manage your daily productivity</p>
        </div>

        <button
          className="bg-slate-900 hover:bg-slate-700 transition-all text-white px-5 py-3 rounded-2xl flex items-center gap-3"
          onClick={handleAddTodo}
        >
          <FontAwesomeIcon icon={faPlus} />
          New task
        </button>
      </div>

      <div className="relative mt-8">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search for specific task"
          className="w-full pl-12 p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-300"
        />
      </div>

      {todos.length !== 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          {todos.map((todo: Todo) => {
            return (
              <Card
                key={todo.id}
                className={`p-5 rounded-3xl border-0 shadow-md hover:shadow-xl transition-all duration-300 ${
                  todo.completed ? "bg-green-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center gap-5">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="border border-slate-200 p-3 rounded-2xl w-full outline-none focus:ring-2 focus:ring-slate-300"
                    />
                  ) : (
                    <div>
                      <p
                        className={`text-lg font-medium ${
                          todo.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800"
                        }`}
                      >
                        {todo.text}
                      </p>

                      <p className="text-sm mt-1 text-slate-400">
                        {todo.completed ? "Completed" : "In progress"}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {editingId === todo.id ? (
                      <button
                        onClick={() => saveChanges(todo)}
                        className="w-12 h-12 rounded-2xl bg-slate-900 text-white hover:scale-105 transition-all"
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(todo)}
                          className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 hover:scale-105 transition-all"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>

                        <button
                          onClick={() => handleDeleteTodo(todo)}
                          className="w-12 h-12 rounded-2xl bg-red-100 text-red-500 hover:scale-105 transition-all"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>

                        {!todo.completed && (
                          <button
                            onClick={() =>
                              handleUpdateTodo({
                                ...todo,
                                completed: true,
                              })
                            }
                            className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 hover:scale-105 transition-all"
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh] text-2xl text-slate-400">
          There are no tasks yet
        </div>
      )}
    </div>
  );
};

export default TaskList;
