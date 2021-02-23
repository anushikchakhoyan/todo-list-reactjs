import React from "react";
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap';
import {RiCloseFill, MdEdit} from "react-icons/all";

const {Body, Text} = Card;

const Task = ({_id, title, disabled, handleRemoveTaskByIds, handleRemoveTaskById}) => {
    return (
        <Card style={{width: '22rem'}} className="todo-item">
            <Body>
                <input type="checkbox" onClick={() => handleRemoveTaskByIds(_id)} />
                <Text><b>Description:</b> {title}</Text>
                <div className="d-flex flex-column align-items-center todo-item-actions">
                    <Button
                        variant="danger"
                        disabled={disabled}
                        onClick={() => handleRemoveTaskById(_id)}>
                        <RiCloseFill className="text-white"/>
                    </Button>
                    <Button  disabled={disabled} variant="secondary" className="my-1 text-white">
                       <MdEdit />
                    </Button>
                </div>
            </Body>
        </Card>
    )
}

Task.propTypes = {
    disabled: PropTypes.bool,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    handleRemoveTaskById: PropTypes.func.isRequired,
    handleRemoveTaskByIds: PropTypes.func.isRequired,
};

export default Task;
