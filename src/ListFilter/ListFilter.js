import { STATUS_ALL, STATUS_HAVE, STATUS_RAN_OUT, statusToColor } from '../data/status';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Badge from 'react-bootstrap/Badge';

const radios = [
    { name: 'All', value: STATUS_ALL },
    { name: 'I have', value: STATUS_HAVE },
    { name: 'Ran out', value: STATUS_RAN_OUT },
];

export function ListFilter({ counts, setValue, value }) {
    return (
        <ButtonGroup>
            {radios.map((radio, i) => {
                const variant = 'outline-' + statusToColor[radio.value];
                return (
                    <ToggleButton
                        key={i}
                        id={`radio-${i}`}
                        type="radio"
                        name="radio"
                        variant={variant}
                        value={radio.value}
                        checked={value === radio.value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                    >
                        {radio.name}
                        <Badge bg="secondary" className="ms-2">
                            {counts[radio.value]}
                        </Badge>
                    </ToggleButton>
                );
            })}
        </ButtonGroup>
    );
}
