import { useCallback, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { ACTION } from '../data/entries';

export function ListEntryAddForm({ dispatch }) {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState(1);
    const [addEnabled, setAddEnabled] = useState(false);
    const nameInputRef = useRef(null);

    const onNameChange = useCallback((e) => {
        const value = e.target.value;
        setName(value);
        setAddEnabled(value.length > 0);
    }, []);

    const onPriorityChange = useCallback((e) => {
        const value = parseInt(e.target.value, 10);
        setPriority(value);
    }, []);

    const onAddClick = useCallback(() => {
        if (nameInputRef.current && nameInputRef.current.focus) {
            nameInputRef.current.focus();
        }
        setName('');
        setAddEnabled(false);
        dispatch({ type: ACTION.ADD, name, priority });
    }, [name, priority, dispatch]);

    return (
        <Stack direction="horizontal" gap={2}>
            <Form.Control ref={nameInputRef} value={name} onChange={onNameChange} type="text" className="me-auto"
                placeholder="Add new item..." />
            <Form.Select value={priority} onChange={onPriorityChange} className="w-auto">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </Form.Select>
            <Button onClick={onAddClick} disabled={!addEnabled}>add</Button>
        </Stack>
    );
}
