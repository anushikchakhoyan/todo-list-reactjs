import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";

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
                    isChecked: false,
                    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },
                {
                    _id: idGenerator(),
                    isChecked: false,
                    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },
                {
                    _id: idGenerator(),
                    isChecked: false,
                    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },

            ],
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

    toggleCheckbox = (id) => {
        this.state.tasks.map(item => item._id === id && this.setState({ ...item, isChecked: item.isChecked = !item.isChecked}));
    }

    render() {
        const {tasks} = this.state;
        return (
            <Container fluid>
                <Row className="mt-4">
                    <Col>
                        <AddNewTask
                            handleSubmit={this.handleSubmit}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    {!tasks.length && <Notification variant="danger" text="The List is empty."/>}
                    {tasks.map(task => (
                        <Col
                            xs={12}
                            md={6}
                            lg={3}
                            key={task._id}
                            className="d-flex justify-content-center my-3"
                        >
                            <Task
                                {...task}
                                toggleCheckbox={this.toggleCheckbox}
                                handleRemoveTaskById={this.handleRemoveTaskById}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default ToDo;
