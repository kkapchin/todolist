export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

type TodolistProps = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: number) => void;
}

export default function Todolist ({title, tasks, removeTask}: TodolistProps) {
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}