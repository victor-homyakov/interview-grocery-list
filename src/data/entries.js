import { generateUid } from '../utils/uid';
import { STATUS_ALL, STATUS_HAVE, STATUS_RAN_OUT } from './status';

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
        this.status = [STATUS_HAVE, STATUS_RAN_OUT].includes(status) ? status : '';
        this.lastStatusChangeTime = new Date();
    }
}

const initialEntries = [
    new Entry('bread', STATUS_HAVE, 2),
    new Entry('tea', STATUS_RAN_OUT, 1),
    new Entry('apples', STATUS_HAVE, 3),
    new Entry('sausages', STATUS_HAVE, 1),
    new Entry('sugar', STATUS_HAVE, 5),
    new Entry('salt', STATUS_HAVE, 1),
    new Entry('milk', STATUS_HAVE, 2),
    new Entry('beer', STATUS_RAN_OUT, 4),
    new Entry('very very very very very very very long name', STATUS_RAN_OUT, 4),
];

/**
 * @param {Array<Entry>} entries
 */
function sortInPlace(entries) {
    entries.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        if (a.name < b.name) {
            return -1;
        } else if (a.name === b.name) {
            return 0;
        } else {
            return 1;
        }
    });
}

/**
 * @param {Array<Entry>} entries
 * @returns {{all: number, have: number, 'ran out': number}}
 */
function getStatusCounts(entries) {
    const counts = {
        [STATUS_ALL]: entries.length,
        [STATUS_HAVE]: 0,
        [STATUS_RAN_OUT]: 0,
    };

    entries.forEach(e => {
        counts[e.status]++;
    });

    return counts;
}

export function init() {
    const entries = initialEntries.slice();
    sortInPlace(entries);
    const counts = getStatusCounts(entries);
    return { entries, counts };
}

export const ACTION_ADD = 'add';
export const ACTION_REMOVE = 'remove';
export const ACTION_TOGGLE_STATUS = 'toggle';

/**
 * @param {{entries: Array<Entry>, counts: object}} state
 * @param {object} action
 * @returns {{entries: Array<Entry>, counts: object}}
 */
export function reducer(state, action) {
    let entries = state.entries;
    const counts = {
        [STATUS_ALL]: state.counts[STATUS_ALL],
        [STATUS_HAVE]: state.counts[STATUS_HAVE],
        [STATUS_RAN_OUT]: state.counts[STATUS_RAN_OUT],
    };

    switch (action.type) {
        case ACTION_ADD:
            entries = [...entries, new Entry(action.name, STATUS_HAVE, action.priority)];
            sortInPlace(entries);
            counts[STATUS_HAVE]++;
            return { entries, counts };
        case ACTION_REMOVE:
            const entry1 = entries.find(e => e.id === action.id);
            entries = entries.filter(e => e.id !== action.id);
            counts[entry1.status]--;
            return { entries, counts };
        case ACTION_TOGGLE_STATUS:
            const entry2 = entries.find(e => e.id === action.id);
            counts[entry2.status]--;
            counts[action.status]++;
            entry2.setStatus(action.status);
            return { entries: entries.slice(), counts };
        default:
            throw new Error(`Unknown action ${action.type}`);
    }
}
