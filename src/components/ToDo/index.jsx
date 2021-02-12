import React, {Component} from 'react';

import Task from "./Task";
import './index.css';

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                "Task 1",
                "Task 2",
                "Task 3"
            ]
        }
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        const { tasks } = this.state;
        return (
            <div className="todo-wrapper">
                <h2>ToDo List</h2>
                <form onSubmit={this.handleOnSubmit}>
                    <input
                        type="text"
                        placeholder="Add Task"
                    />
                    <button className="add-button" type="submit">Add</button>
                </form>
                <div className="tasks-wrapper">
                    {tasks.map((task, index) => (
                        <Task task={task} key={index}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default ToDo;
