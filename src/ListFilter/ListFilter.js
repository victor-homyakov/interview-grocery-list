import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { STATUS, statusToColor } from '../data/status';

const radios = [
    { name: 'All', value: STATUS.ALL },
    { name: 'I have', value: STATUS.HAVE },
    { name: 'Ran out', value: STATUS.RAN_OUT },
];

function Toggle({ radio, checked, count, setValue }) {
    const value = radio.value;
    const variant = 'outline-' + statusToColor[value];
    return (
        <ToggleButton
            type="radio"
            name="radio"
            variant={variant}
            value={value}
            checked={checked}
            onChange={(e) => setValue(e.currentTarget.value)}
        >
            {radio.name}
            <Badge bg="secondary" className="ms-2">{count}</Badge>
        </ToggleButton>
    );
}

export function ListFilter({ counts, setValue, value }) {
    return (
        <ButtonGroup>
            {radios.map((radio, i) => {
                const checked = value === radio.value;
                const count = counts[radio.value];
                return <Toggle key={i} radio={radio} checked={checked} count={count} setValue={setValue} />;
            })}
        </ButtonGroup>
    );
}
