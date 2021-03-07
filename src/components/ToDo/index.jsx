import React, {Component} from 'react';
import {Col, Container, Row, Button} from "react-bootstrap";

import idGenerator from "../../helpers/idGenerator";
import AddEditTaskModal from "./AddEditTaskModal";
import ConfirmModal from "../ConfirmModal";
import Notification from "../Notification";
import Task from "./Task";
import './index.css';

class ToDo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                {
                    _id: idGenerator(),
                    title: `Lorem Ipsum`,
                    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },
                {
                    _id: idGenerator(),
                    title: `Lorem Ipsum`,
                    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },
                {
                    _id: idGenerator(),
                    title: `Lorem Ipsum`,
                    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
                },
            ],
            editableTask: null,
            isAllChecked: false,
            removeTasks: new Set(),
            isAddTaskModalVisible: false,
            isConfirmModalVisible: false
        }
    }

    handleSubmit = (formData) => {
        if (!formData.title || !formData.description) return;
        const tasks = [...this.state.tasks];
        tasks.push({
            _id: idGenerator(),
            title: formData.title,
            description: formData.description,
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
        const {removeTasks} = this.state;
        tasks = tasks.filter(item => !removeTasks.has(item._id));
        this.setState({
            tasks,
            removeTasks: new Set(),
            isAllChecked: false
        });
    }

    handleCheckAll = () => {
        const {tasks, isAllChecked} = this.state;
        let removeTasks = new Set();
        if (!isAllChecked) {
            removeTasks = new Set(this.state.removeTasks);
            tasks.forEach(task => removeTasks.add(task._id));
        }

        this.setState({
            removeTasks,
            isAllChecked: !isAllChecked
        });
    }

    handleEditTask = (editTask) => {
        const tasks = [...this.state.tasks];
        const idx = tasks.findIndex(task => task._id === editTask._id);
        tasks[idx] = editTask;
        this.setState({
            tasks
        });
    }

    render() {
        const {
            tasks,
            removeTasks,
            isAllChecked,
            editableTask,
            isAddTaskModalVisible,
            isConfirmModalVisible
        } = this.state;

        return (
            <>
                <Container fluid>
                    <Row className="my-4">
                        <Col className="d-flex justify-content-end">
                            <Button disabled={!!removeTasks.size}
                                    variant="outline-primary"
                                    onClick={() => {
                                        this.setState({isAddTaskModalVisible: !this.state.isAddTaskModalVisible})
                                    }}>
                                Add Task
                            </Button>
                            <Button
                                className="mx-1"
                                variant="outline-danger"
                                disabled={!!!removeTasks.size}
                                onClick={() => {
                                    this.setState({
                                        isConfirmModalVisible: !this.state.isConfirmModalVisible
                                    });
                                }}
                            >
                                Remove Selected
                            </Button>
                            <Button
                                className="mx-1"
                                variant="outline-info"
                                disabled={!!!tasks.length}
                                onClick={this.handleCheckAll}
                            >
                                {isAllChecked ? 'Unselect' : 'Select All'}
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-4 align-items-start">
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
                                    task={task}
                                    disabled={!!removeTasks.size}
                                    isChecked={removeTasks.has(task._id)}
                                    handleSetEditTask={(task) => {
                                        this.setState({
                                            editableTask: task
                                        });
                                    }}
                                    handleRemoveTaskById={this.handleRemoveTaskById}
                                    handleRemoveTaskByIds={this.handleRemoveTaskByIds}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
                {isConfirmModalVisible && <ConfirmModal
                    isShow={true}
                    onSubmit={this.handleRemoveSelectedTasks}
                    message={`Would you like to remove  ${removeTasks.size} task(s)? `}
                    onClose={() => this.setState({isConfirmModalVisible: !this.state.isConfirmModalVisible})}
                />
                }
                {editableTask && <AddEditTaskModal
                    isShow={true}
                    modalTitle="Edit Task"
                    editableTask={editableTask}
                    onSubmit={this.handleEditTask}
                    onHide={() => {
                        this.setState({editableTask: null})
                    }}
                />
                }
                {isAddTaskModalVisible && <AddEditTaskModal
                    isShow={true}
                    modalTitle="Add Task"
                    editableTask={editableTask}
                    onSubmit={this.handleSubmit}
                    onHide={() => this.setState({isAddTaskModalVisible: !this.state.isAddTaskModalVisible})}
                />
                }
            </>
        )
    }
}

export default ToDo;
