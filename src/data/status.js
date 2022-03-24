export const STATUS = {
    ALL: 'all',
    HAVE: 'have',
    RAN_OUT: 'ran out',
};

export const statusToColor = {
    [STATUS.ALL]: 'primary',
    [STATUS.HAVE]: 'success',
    [STATUS.RAN_OUT]: 'danger',
};
