import './App.css';
import {useState} from "react";
import Todolist from "./Todolist";

export enum Filter {
    ALL = 'ALL',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
}

export default function App() {

    const initialTasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "RestAPI", isDone: false },
        { id: 5, title: "GraphQL", isDone: false },
    ]

    const [tasks, setTasks] = useState(initialTasks);
    const [filter, setFilter] = useState(Filter.ALL);

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const changeFilter = (newFilter: Filter) => {
        setFilter(newFilter);
    }

    const getFilteredTasks = () => {
        switch (filter) {
            case Filter.ACTIVE:
                return tasks.filter(task => !task.isDone);
            case Filter.COMPLETED:
                return tasks.filter(task => task.isDone);
            case Filter.ALL:
                return tasks;
        }
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={getFilteredTasks()}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}
