import { useCallback } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ACTION } from '../data/entries';
import { STATUS, statusToColor } from '../data/status';

export function ListEntry({ entry, dispatch }) {
    const id = entry.id;
    const status = entry.status;
    const bg = 'bg-' + statusToColor[status];

    const onClick = useCallback(() => {
        dispatch({ type: ACTION.REMOVE, id });
    }, [dispatch, id]);

    const onChange = useCallback((e) => {
        const checked = e.target.checked;
        const newStatus = checked ? STATUS.HAVE : STATUS.RAN_OUT;
        dispatch({ type: ACTION.TOGGLE_STATUS, id, status: newStatus });
    }, [dispatch, id]);

    return (
        <Row className={`${bg} bg-opacity-25 rounded my-2 py-2`}>
            <Col className="pe-0" style={{ maxWidth: 'fit-content' }}>
                <Form.Check type="switch" checked={(status === STATUS.HAVE)} onChange={onChange} />
            </Col>
            <Col className="ps-0" style={{ maxWidth: '11em' }}>
                {entry.lastStatusChangeTime.toLocaleString()}
            </Col>
            <Col>{entry.name}</Col>
            <Col style={{ maxWidth: '4.5em' }}>{entry.priority}</Col>
            <Col style={{ maxWidth: '3em' }}><CloseButton onClick={onClick} /></Col>
        </Row>
    );
}
