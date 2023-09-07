import './App.css';
import { TaskProvider } from './context/TaskProvider';
import Main from './layouts/Main';


function App() {

  return (
    <TaskProvider>
      <Main />
    </TaskProvider>
  )
}

export default App
