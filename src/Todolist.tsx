import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskType} from "./Types/task-type";
import {Filter} from "./const";

type TodolistProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: Filter) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export default function Todolist(props: TodolistProps) {
    const {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeStatus,
    } = props;

    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') {
            return;
        }
        addTask(newTitle);
        setNewTitle('');
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       value={newTitle}
                />
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task => {

                    const onRemoveHandler = () => {removeTask(task.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatus(task.id, e.currentTarget.checked);
                    }

                    return (
                        <li key={task.id}>
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
                <button onClick={() => changeFilter(Filter.ALL)}>All</button>
                <button onClick={() => changeFilter(Filter.ACTIVE)}>Active</button>
                <button onClick={() => changeFilter(Filter.COMPLETED)}>Completed</button>
            </div>
        </div>
    );
}