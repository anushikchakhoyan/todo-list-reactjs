import React from "react";
import PropTypes from 'prop-types';

const Task = ({task}) => (
    <div className="task">
        {task}
    </div>
)

Task.propTypes = {
    task: PropTypes.string.isRequired
};

export default Task;
