import React, {Component} from 'react';
import {Col, Container, Row, Button} from "react-bootstrap";

import idGenerator from "../../helpers/idGenerator";
import Notification from "../Notification";
import AddNewTask from "./AddNewTask";
import Task from "./Task";
import './index.css';

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                {
                    _id: idGenerator(),
                    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },
                {
                    _id: idGenerator(),
                    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },
                {
                    _id: idGenerator(),
                    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },
            ],
            removeTasks: new Set()
        }
    }

    handleSubmit = (value) => {
        if (!value) return;
        const tasks = [...this.state.tasks];
        tasks.push({
            _id: idGenerator(),
            title: value
        });
        this.setState({
            tasks
        });
    }

    handleRemoveTaskById = (id) => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(item => item._id !== id);
        this.setState({
            tasks
        });
    }

    handleRemoveTaskByIds = (_id) => {
        let removeTasks = new Set(this.state.removeTasks);
        removeTasks.has(_id) ? removeTasks.delete(_id) : removeTasks.add(_id);
        this.setState({
            removeTasks
        });
    }

    handleRemoveSelectedTasks = () => {
        let tasks = [...this.state.tasks];
        const { removeTasks } = this.state;
        tasks = tasks.filter(item => !removeTasks.has(item._id));
        this.setState({
            tasks,
            removeTasks: new Set()
        });

    }

    render() {
        const {tasks, removeTasks} = this.state;

        return (
            <Container fluid>
                <Row className="my-4">
                    <Col>
                        <AddNewTask
                            disabled={!!removeTasks.size}
                            handleSubmit={this.handleSubmit}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="danger"
                            disabled={!!!removeTasks.size}
                            onClick={this.handleRemoveSelectedTasks}
                        >
                            Remove Selected
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {!tasks.length && <Notification variant="danger" text="The List is empty."/>}
                    {tasks.map(task => (
                        <Col
                            lg={3}
                            md={6}
                            xs={12}
                            key={task._id}
                            className="d-flex justify-content-center my-3"
                        >
                            <Task
                                {...task}
                                disabled={!!removeTasks.size}
                                handleRemoveTaskById={this.handleRemoveTaskById}
                                handleRemoveTaskByIds={this.handleRemoveTaskByIds}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default ToDo;
