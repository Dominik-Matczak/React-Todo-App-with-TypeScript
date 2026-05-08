import { useTodos } from "../hooks/useTodo";
import type { Todo } from "../lib/types";
import { useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faStar,
  faSpinner,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const TaskMenu = () => {
  const { data, handleDeleteTodo } = useTodos();

  const todos: Todo[] = useMemo(() => {
    return data ?? [];
  }, [data]);

  const handleAllCompletedTasksDeletion = () => {
    todos.map((todo) => {
      if (todo.completed === true) {
        handleDeleteTodo(todo);
      }
    });
  };

  return (
    <div
      id="task-menu"
      className="col-span-3 border-r border-slate-200 bg-slate-50/50 flex flex-col justify-between"
    >
      <div>
        <h1 className="py-8 px-7 text-3xl font-bold text-slate-800">
          My Tasks
        </h1>

        <ul className="flex flex-col gap-4 p-5">
          <li className="flex items-center gap-3 py-4 px-4 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <FontAwesomeIcon icon={faList} />
            <span>All tasks</span>
          </li>

          <li className="flex items-center gap-3 py-4 px-4 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <FontAwesomeIcon icon={faStar} />
            <span>Priority</span>
          </li>

          <li className="flex items-center gap-3 py-4 px-4 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <FontAwesomeIcon icon={faSpinner} />
            <span>In progress</span>
          </li>

          <li className="flex items-center gap-3 py-4 px-4 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <FontAwesomeIcon icon={faCheck} />
            <span>Completed</span>
          </li>
        </ul>
      </div>

      <div className="p-5">
        <button
          className="w-full bg-red-500 hover:bg-red-600 transition-all text-white p-4 rounded-2xl flex items-center justify-center gap-3"
          onClick={handleAllCompletedTasksDeletion}
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete completed
        </button>
      </div>
    </div>
  );
};

export default TaskMenu;
