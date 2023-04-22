import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    addItem: (title: string) => void
}

export default function AddItemForm ({ addItem }: PropsType) {

    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        if (newTitle.trim() === '') {
            setError('Title is required')
            return;
        }
        addItem(newTitle.trim());
        setNewTitle('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key !== 'Enter') {
            return;
        }
        addItemHandler();
    }

    return (
        <div>
            <input onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   value={newTitle}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItemHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}