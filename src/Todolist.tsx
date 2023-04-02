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
    currentFilter: Filter
}

export default function Todolist(props: TodolistProps) {
    const {
        title,
        tasks,
        removeTask,
        changeFilter,
        changeStatus,
        currentFilter,
    } = props;

    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (newTitle.trim() === '') {
            setError('Title is required')
            return;
        }
        props.addTask(newTitle.trim());
        setNewTitle('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key !== 'Enter') {
            return;
        }
        addTask();
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       value={newTitle}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks.map(task => {

                    const onRemoveHandler = () => {removeTask(task.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatus(task.id, e.currentTarget.checked);
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
                <button onClick={() => changeFilter(Filter.ALL)}
                        className={currentFilter === Filter.ALL ? 'active-filter' : ''}
                >All</button>
                <button onClick={() => changeFilter(Filter.ACTIVE)}
                        className={currentFilter === Filter.ACTIVE ? 'active-filter' : ''}
                >Active</button>
                <button onClick={() => changeFilter(Filter.COMPLETED)}
                        className={currentFilter === Filter.COMPLETED ? 'active-filter' : ''}
                >Completed</button>
            </div>
        </div>
    );
}