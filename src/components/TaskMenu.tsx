
const TaskMenu = () => {
  

  return <div id="task-menu" className="col-span-3 border-r">
    <h1 className="py-5 px-7 text-xl">My To-Do List</h1>
    <ul className="flex flex-col gap-3 p-5 pb-20 border-b">
        <li className="py-3 px-2 rounded-xl border">All tasks</li>
        <li className="py-3 px-2 rounded-xl border">Priority</li>
        <li className="py-3 px-2 rounded-xl border">In progress</li>
        <li className="py-3 px-2 rounded-xl border">Completed</li>
    </ul>
    <button className="p-3 px-7 mt-3 ">Delete completed tasks</button>
  </div>
};

export default TaskMenu;
