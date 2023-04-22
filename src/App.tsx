import './App.css';
import {useState} from "react";
import Todolist from "./components/todolist/todolist";
import {v1} from "uuid";
import {Filter} from "./const";
import {TodolistType} from "./types/todolist-type";
import AddItemForm from "./components/add-item-form/add-item-form";
import {TaskType} from "./types/task-type";

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export default function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: Filter.ALL},
        {id: todolistId2, title: 'What to buy', filter: Filter.ALL},
    ]);

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "RestAPI", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Meat", isDone: false},
                {id: v1(), title: "Eggs", isDone: false},
                {id: v1(), title: "Butter", isDone: false},
            ],
    });

    const removeTodolist = (todolistId: string) => {
        setTodolists([
            ...todolists.filter(tl => tl.id !== todolistId)
        ]);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
    }

    const removeTask = (id: string, todolistId: string) => {
        tasksObj[todolistId] = tasksObj[todolistId].filter(task => task.id !== id);
        setTasksObj({...tasksObj});
    }

    const changeFilter = (newFilter: Filter, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = newFilter;
            setTodolists([...todolists]);
        }
    }

    const addTask = (title: string, todolistId: string) => {
        tasksObj[todolistId] = [{
            id: v1(),
            title: title,
            isDone: false,
        }, ...tasksObj[todolistId]];
        setTasksObj({...tasksObj});
    }

    const addTodolist = (title: string) => {
        const todolist = {
            id: v1(),
            title: title,
            filter: Filter.ALL,
        }
        setTodolists([todolist, ...todolists]);
        setTasksObj({[todolist.id]: [], ...tasksObj});
    }

    const changeTaskStatus = (taskId: string, todolistId: string, isDone: boolean) => {
        const task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }

    const changeTaskTitle = (taskId: string, todolistId: string, newTitle: string) => {
        const task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj});
        }
    }

    const getFilteredTasks = (filter: Filter, todolistId: string) => {
        switch (filter) {
            case Filter.ACTIVE:
                return tasksObj[todolistId].filter(task => !task.isDone);
            case Filter.COMPLETED:
                return tasksObj[todolistId].filter(task => task.isDone);
            case Filter.ALL:
                return tasksObj[todolistId];
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={getFilteredTasks(tl.filter, tl.id)}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        changeTitle={changeTaskTitle}
                        currentFilter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}
