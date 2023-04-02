import './App.css';
import {useState} from "react";
import Todolist from "./Todolist";
import {v1} from "uuid";
import {TaskType} from "./Types/task-type";
import {Filter} from "./const";
import {TodolistType} from "./Types/todolist-type";

export default function App() {

    const initialTasks: Array<TaskType> = [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "RestAPI", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(initialTasks);
    const [filter, setFilter] = useState<Filter>(Filter.ALL);

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const changeFilter = (newFilter: Filter) => {
        setFilter(newFilter);
    }

    const addTask = (title: string) => {
        setTasks([{
            id: v1(),
            title: title,
            isDone: false,
        }, ...tasks]);
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === taskId);
        if(task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
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

    const todolists: Array<TodolistType> = [
        {id: v1(), title: 'What to learn', filter: Filter.ALL},
        {id: v1(), title: 'What to buy', filter: Filter.COMPLETED},
    ]

    return (
        <div className="App">
            {todolists.map(tl => {
                return (
                    <Todolist
                        title={tl.title}
                        tasks={getFilteredTasks()}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        currentFilter={tl.filter}
                    />
                )
            })}
        </div>
    );
}
