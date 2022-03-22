export const STATUS_ALL = 'all';
export const STATUS_HAVE = 'have';
export const STATUS_RAN_OUT = 'ran out';

export const statusToColor = {
    [STATUS_ALL]: 'primary',
    [STATUS_HAVE]: 'success',
    [STATUS_RAN_OUT]: 'danger',
};
