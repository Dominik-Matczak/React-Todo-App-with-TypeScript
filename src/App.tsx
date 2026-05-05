import TaskList from "./components/TaskList"
import TaskMenu from "./components/TaskMenu"
import { Card } from "./components/ui/card"

const App = () => {
  return (
    <div id="page-contnent" className="w-screen h-screen flex items-center justify-center">
        <Card className="w-[70%] h-[80%] shadow-xl shadow-black/30 hover:shadow-2xl transition-all duration-30 grid grid-cols-12 p-0 m-0">
          <TaskMenu/>
          <TaskList/>
        </Card>
    </div>
  )

}

export default App

