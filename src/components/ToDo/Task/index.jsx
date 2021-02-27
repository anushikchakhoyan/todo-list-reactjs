import React, {memo} from "react";
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap';
import {RiCloseFill, MdEdit} from "react-icons/all";

const {Body, Text} = Card;

const Task = memo(({_id, isChecked, title, disabled, handleRemoveTaskByIds, handleRemoveTaskById}) => {
    return (
        <Card className={`todo-item ${isChecked && 'selected'}`}>
            <Body>
                <input type="checkbox" onChange={() => handleRemoveTaskByIds(_id)} checked={isChecked} />
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
})

Task.propTypes = {
    disabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    handleRemoveTaskById: PropTypes.func.isRequired,
    handleRemoveTaskByIds: PropTypes.func.isRequired,
};

export default Task;
