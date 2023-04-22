import {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export default function EditableSpan ({onChange,...props}: PropsType) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <input value={title}
                 onBlur={activateViewMode}
                 onChange={onChangeHandler}
                 autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}