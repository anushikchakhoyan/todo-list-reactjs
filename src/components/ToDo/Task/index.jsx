import React, {memo} from "react";
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap';
import {RiCloseFill, MdEdit} from "react-icons/all";

import formatDate from "../../../helpers/date.helper";

const {Body, Text} = Card;

const Task = memo(({task, isChecked, disabled, toggleSetRemoveTaskId, handleRemoveSingleTask, handleSetEditTask}) => {
    const {_id, title, date,  description} = task;
    return (
        <Card className={`todo-item ${isChecked && 'selected'}`}>
            <Body className="todo-item-body">
                <input type="checkbox" onChange={() => toggleSetRemoveTaskId(_id)} checked={isChecked}/>
                {date && (
                    <Text><b>Created Date:</b> {formatDate(date)}</Text>
                )}
                <Text><b>Title:</b> {title}</Text>
                <Text><b>Description:</b> {description}</Text>
            </Body>
            <div className="d-flex flex-column align-items-center todo-item-actions">
                <Button
                    variant="danger"
                    disabled={disabled}
                    onClick={() => handleRemoveSingleTask(_id)}>
                    <RiCloseFill className="text-white"/>
                </Button>
                <Button disabled={disabled} variant="secondary" className="my-1 text-white"
                        onClick={() => handleSetEditTask(task)}>
                    <MdEdit/>
                </Button>
            </div>
        </Card>
    )
})

Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string,
        date: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    }).isRequired,
    disabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    handleSetEditTask: PropTypes.func,
    toggleSetRemoveTaskId: PropTypes.func.isRequired,
    handleRemoveSingleTask: PropTypes.func.isRequired,
};

export default Task;
