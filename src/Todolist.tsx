import {Filter} from "./App";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

type TodolistProps = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: number) => void;
    changeFilter: (filter: Filter) => void;
}

export default function Todolist ({title, tasks, removeTask, changeFilter}: TodolistProps) {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title} </span>
                            <button onClick={() => {
                                removeTask(task.id);
                            }}>✖️</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => changeFilter(Filter.ALL)}>All</button>
                <button onClick={() => changeFilter(Filter.ACTIVE)}>Active</button>
                <button onClick={() => changeFilter(Filter.COMPLETED)}>Completed</button>
            </div>
        </div>
    );
}