import {ChangeEvent, KeyboardEvent, useState} from "react";

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

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') {
            return;
        }
        activateViewMode();
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <input value={title}
                 onBlur={activateViewMode}
                 onChange={onChangeHandler}
                 onKeyDown={onKeyDownHandler}
                 autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}