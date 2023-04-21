import {ChangeEvent} from "react";
import {TaskType} from "../../types/task-type";
import {Filter} from "../../const";
import AddItemForm from "../add-item-form/add-item-form";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: Filter, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, todolistId: string, isDone: boolean) => void
    currentFilter: Filter
    removeTodolist: (todolistId: string) => void
}

export default function Todolist(props: PropsType) {
    const {
        id,
        title,
        tasks,
        removeTask,
        changeFilter,
        changeStatus,
        currentFilter,
        removeTodolist,
    } = props;

    const addTask = (title: string) => {
        props.addTask(title, id);
    }

    const removeTodolistHandler = () => {
        removeTodolist(id);
    }

    return (
        <div>
            <h3>{title}</h3>
            <button onClick={removeTodolistHandler}>✖️</button>
            <AddItemForm addItem={addTask} />
            <ul>
                {tasks.map(task => {

                    const onRemoveHandler = () => {removeTask(task.id, id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatus(task.id, id, e.currentTarget.checked);
                    }

                    return (
                        <li key={task.id}
                            className={task.isDone ? 'is-done': ''}
                        >
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeHandler}
                            />
                            <span>{task.title} </span>
                            <button onClick={onRemoveHandler}>✖️
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => changeFilter(Filter.ALL, id)}
                        className={currentFilter === Filter.ALL ? 'active-filter' : ''}
                >All</button>
                <button onClick={() => changeFilter(Filter.ACTIVE, id)}
                        className={currentFilter === Filter.ACTIVE ? 'active-filter' : ''}
                >Active</button>
                <button onClick={() => changeFilter(Filter.COMPLETED, id)}
                        className={currentFilter === Filter.COMPLETED ? 'active-filter' : ''}
                >Completed</button>
            </div>
        </div>
    );
}