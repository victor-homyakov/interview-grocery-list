import './GroceryList.css';
import { useCallback, useReducer, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ACTION_ADD, ACTION_REMOVE, ACTION_TOGGLE_STATUS, init, reducer } from '../data/entries';
import { STATUS_ALL } from '../data/status';
import { ListEntry } from '../ListEntry/ListEntry';
import { ListFilter } from '../ListFilter/ListFilter';
import { ListEntryAddForm } from '../ListEntryAddForm/ListEntryAddForm';

/*
On the list view, I can
- add entries,
- remove entries,
- toggle the status of that entry as either "ran out" or "have",
- see when the status toggle was last changed,
- and filter entries by status.

The list view should always sort by priority first, and then alphabetically.
Priority 1 is the highest priority, 5 is the lowest.

I should be able to filter for only "ran out", "have", or all, this will make it easy
for when I'm shopping to see what I need to buy by filtering for the "ran out" status.
*/

function GroceryList() {
    const [filterValue, setFilterValue] = useState(STATUS_ALL);
    const [state, dispatch] = useReducer(reducer, undefined, init);

    const { entries, counts } = state;
    const filteredEntries = (filterValue === STATUS_ALL) ?
        entries :
        entries.filter(e => e.status === filterValue);

    const onStatusToggle = useCallback((id, status) => {
        dispatch({ type: ACTION_TOGGLE_STATUS, id, status });
    }, []);

    const onRemoveClick = useCallback((id) => {
        dispatch({ type: ACTION_REMOVE, id });
    }, []);

    const onAdd = useCallback((name, priority) => {
        dispatch({ type: ACTION_ADD, name, priority });
    }, []);

    return (
        <Container>
            <Row className="mt-2">
                <Col>
                    <ListFilter counts={counts} value={filterValue} setValue={setFilterValue} />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <ListEntryAddForm onAdd={onAdd} />
                </Col>
            </Row>
            <Container className="mt-2">
                {filteredEntries.map(e => <ListEntry key={e.id} entry={e} onStatusToggle={onStatusToggle}
                    onRemoveClick={onRemoveClick} />)}
            </Container>
        </Container>
    );
}

export default GroceryList;
