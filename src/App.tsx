import './App.css';
import {useState} from "react";
import Todolist from "./Todolist";

export default function App() {

    const initialTasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "RestAPI", isDone: false },
        { id: 5, title: "GraphQL", isDone: false },
    ]

    const [tasks, setTasks] = useState(initialTasks);

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}
