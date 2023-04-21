import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskType} from "../../types/task-type";
import {Filter} from "../../const";

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
        props.addTask(newTitle.trim(), id);
        setNewTitle('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key !== 'Enter') {
            return;
        }
        addTask();
    }

    const removeTodolistHandler = () => {
        removeTodolist(id);
    }

    return (
        <div>
            <h3>{title}</h3>
            <button onClick={removeTodolistHandler}>✖️</button>
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