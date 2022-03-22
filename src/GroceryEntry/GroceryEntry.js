import './GroceryEntry.css';

/*
On the entry view, I
- can see all the details of the entry,
- toggle its status,
- and view the history of when its status has ever changed.

Each entry has a name for the item (e.g. bread, eggs, etc), status (ran out or have)
and a priority (numbers 1 through 5).

I should also be able to delete the current entry here as well.
*/

function GroceryEntry() {
    return (
        <div>
            <div>[delete]</div>
            <div>GroceryEntry name: status:(editable) priority:</div>
            <div>Status history:</div>
        </div>
    );
}

export default GroceryEntry;
