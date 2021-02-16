import React from "react";
import PropTypes from 'prop-types';
import {Card, Form, Button} from 'react-bootstrap';
import {RiCloseFill, MdEdit} from "react-icons/all";

const {Body, Title, Text} = Card;
const {Group, Check} = Form;

const Task = ({_id, title, isChecked, handleRemoveTaskById, toggleCheckbox}) => {
    return (
        <Card style={{width: '22rem'}} className="todo-item">
            <Body>
                <Title>
                    <Group controlId={_id}>
                        <Check type="checkbox" checked={isChecked} onChange={() => toggleCheckbox(_id)} />
                    </Group>
                </Title>
                <Text><b>Description:</b> {title}</Text>
                <div className="d-flex flex-column align-items-center todo-item-actions">
                    <Button
                        variant="danger"
                        onClick={() => handleRemoveTaskById(_id)}>
                        <RiCloseFill className="text-white"/>
                    </Button>
                    <Button variant="secondary" className="my-1 text-white">
                       <MdEdit />
                    </Button>
                </div>
            </Body>
        </Card>
    )
}

Task.defaultProps = {
    isChecked: false,
}

Task.propTypes = {
    isChecked: PropTypes.bool,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
    handleRemoveTaskById: PropTypes.func.isRequired,
};

export default Task;
