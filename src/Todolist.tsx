type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

type TodolistProps = {
    title: string,
    tasks: Array<TaskType>,
}

function Todolist({title, tasks}: TodolistProps) {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {tasks.map((task) => <li><input type="checkbox" checked={task.isDone} /> <span>{task.title}</span></li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;