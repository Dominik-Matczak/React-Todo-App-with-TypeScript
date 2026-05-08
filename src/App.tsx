import TaskList from "./components/TaskList";
import TaskMenu from "./components/TaskMenu";
import { Card } from "./components/ui/card";

const App = () => {
  return (
    <div className="min-h-screen w-screen bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center p-10">
      <Card className="w-full max-w-7xl h-[90vh] overflow-hidden border-0 bg-white/80 backdrop-blur-xl shadow-2xl rounded-[32px] grid grid-cols-12">
        <TaskMenu />
        <TaskList />
      </Card>
    </div>
  );
};

export default App;
