import './GroceryList.css';
import { useReducer, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { init, reducer } from '../data/entries';
import { STATUS } from '../data/status';
import { ListEntry } from '../ListEntry/ListEntry';
import { ListEntryAddForm } from '../ListEntryAddForm/ListEntryAddForm';
import { ListFilter } from '../ListFilter/ListFilter';

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
    const [filterValue, setFilterValue] = useState(STATUS.ALL);
    const [state, dispatch] = useReducer(reducer, undefined, init);
    const { entries, counts } = state;

    const filteredEntries = (filterValue === STATUS.ALL) ?
        entries :
        entries.filter(e => e.status === filterValue);

    return (
        <div>
            <Container>
                <Row className="mt-2">
                    <Col>
                        <ListFilter counts={counts} value={filterValue} setValue={setFilterValue} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <ListEntryAddForm dispatch={dispatch} />
                    </Col>
                </Row>
                <Container className="mt-2">
                    {filteredEntries.map(e => <ListEntry key={e.id} entry={e} dispatch={dispatch} />)}
                </Container>
            </Container>
        </div>
    );
}

export default GroceryList;
