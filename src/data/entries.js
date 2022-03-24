import { STATUS } from './status';
import { generateUid } from '../utils/uid';

class Entry {
    id;
    name;
    status;
    lastStatusChangeTime;
    priority;

    /**
     * @param {string} name
     * @param {string} status
     * @param {number} priority
     */
    constructor(name, status, priority) {
        this.id = generateUid();
        this.name = name;
        this.priority = priority;
        this.setStatus(status);
    }

    setStatus(status) {
        this.status = [STATUS.HAVE, STATUS.RAN_OUT].includes(status) ? status : '';
        this.lastStatusChangeTime = new Date();
    }
}

const initialEntries = [
    new Entry('bread', STATUS.HAVE, 2),
    new Entry('tea', STATUS.RAN_OUT, 1),
    new Entry('apples', STATUS.HAVE, 3),
    new Entry('sausages', STATUS.HAVE, 1),
    new Entry('sugar', STATUS.HAVE, 5),
    new Entry('salt', STATUS.HAVE, 1),
    new Entry('milk', STATUS.HAVE, 2),
    new Entry('beer', STATUS.RAN_OUT, 4),
    new Entry('very very very very very very very long name', STATUS.RAN_OUT, 4),
];

/**
 * @param {Array<Entry>} entries
 */
function sortInPlace(entries) {
    entries.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.name.localeCompare(b.name);
    });
}

/**
 * @param {Array<Entry>} entries
 * @returns {{all: number, have: number, 'ran out': number}}
 */
function getStatusCounts(entries) {
    const counts = {
        [STATUS.ALL]: entries.length,
        [STATUS.HAVE]: 0,
        [STATUS.RAN_OUT]: 0,
    };

    entries.forEach(e => {
        counts[e.status]++;
    });

    return counts;
}

function copyCountsFromState(state) {
    const counts = state.counts;
    return {
        [STATUS.ALL]: counts[STATUS.ALL],
        [STATUS.HAVE]: counts[STATUS.HAVE],
        [STATUS.RAN_OUT]: counts[STATUS.RAN_OUT],
    };
}

export function init() {
    const entries = initialEntries.slice();
    sortInPlace(entries);
    const counts = getStatusCounts(entries);
    return { entries, counts };
}

export const ACTION = {
    ADD: 'add',
    REMOVE: 'remove',
    TOGGLE_STATUS: 'toggle',
};

/**
 * @param {{entries: Array<Entry>, counts: object}} state
 * @param {object} action
 * @returns {{entries: Array<Entry>, counts: object}}
 */
export function reducer(state, action) {
    switch (action.type) {
        case ACTION.ADD: {
            const entries = [...state.entries, new Entry(action.name, STATUS.HAVE, action.priority)];
            sortInPlace(entries);
            const counts = copyCountsFromState(state);
            counts[STATUS.ALL]++;
            counts[STATUS.HAVE]++;
            return { entries, counts };
        }
        case ACTION.REMOVE: {
            let entries = state.entries;
            const entry = entries.find(e => e.id === action.id);
            entries = entries.filter(e => e !== entry);
            const counts = copyCountsFromState(state);
            counts[STATUS.ALL]--;
            counts[entry.status]--;
            return { entries, counts };
        }
        case ACTION.TOGGLE_STATUS: {
            const entries = state.entries.slice();
            const index = entries.findIndex(e => e.id === action.id);
            const entry = entries[index];
            const counts = copyCountsFromState(state);
            counts[entry.status]--;
            counts[action.status]++;
            entry.status = action.status;
            return { entries, counts };
        }
        default: {
            throw new Error(`Unknown action ${action.type}`);
        }
    }
}
