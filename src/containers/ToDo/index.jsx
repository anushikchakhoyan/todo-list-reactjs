import React, {Component} from 'react';
import {Col, Container, Row, Button} from "react-bootstrap";

import AddEditTaskModal from "../../components/ToDo/AddEditTaskModal";
import ConfirmModal from "../../components/ConfirmModal";
import Notification from "../../components/Notification";
import Task from "../../components/ToDo/TaskItem";

class ToDoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            editableTask: null,
            isAllChecked: false,
            removeTasks: new Set(),
            isAddTaskModalVisible: false,
            isConfirmModalVisible: false
        }
    }

    handleSubmit = (formData) => {
        const tasks = [...this.state.tasks];

        if (!formData.title || !formData.description) return;

        fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(result => result.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                tasks.push(data)
                this.setState({
                    tasks
                });
            })
            .catch(error => {
                console.error("catch Error", error);
            });
    }

    toggleSetRemoveTaskId = (_id) => {
        let removeTasks = new Set(this.state.removeTasks);
        removeTasks.has(_id) ? removeTasks.delete(_id) : removeTasks.add(_id);
        this.setState({
            removeTasks
        });
    }

    handleRemoveSingleTask = (_id) => {
        fetch(`http://localhost:3001/task/${_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                let tasks = [...this.state.tasks];
                tasks = tasks.filter(item => item._id !== _id);
                this.setState({
                    tasks
                });
            })
            .catch(error => {
                console.error("Delete TaskItem By ID Request Error", error);
            });
    }

    handleRemoveSelectedTasks = () => {
        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(this.state.removeTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                let tasks = [...this.state.tasks];
                const { removeTasks } = this.state;
                tasks = tasks.filter(item => !removeTasks.has(item._id));
                this.setState({
                    tasks,
                    removeTasks: new Set(),
                    isAllChecked: false
                });
            })
            .catch(error => {
                console.error("Bulk Delete Tasks Request Error", error);
            });
    }

    handleToggleSelectAllTask = () => {
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
        const { _id } = editTask;
        fetch(`http://localhost:3001/task/${_id}`, {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                const tasks = [...this.state.tasks];
                const idx = tasks.findIndex(task => task._id === data._id);
                tasks[idx] = data;
                this.setState({
                    tasks
                });
            })
            .catch(error => {
                console.error("Edit Tasks Request Error", error);
            });
    }

    componentDidMount() {
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.setState({
                    tasks: data
                });
            })
            .catch(error => {
                console.error("Get Tasks Request Error", error);
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
                                    variant="secondary"
                                    onClick={() => {
                                        this.setState({isAddTaskModalVisible: !this.state.isAddTaskModalVisible})
                                    }}>
                                Add Task
                            </Button>
                            <Button
                                className="mx-1"
                                variant="secondary"
                                disabled={!!!tasks.length}
                                onClick={this.handleToggleSelectAllTask}
                            >
                                {isAllChecked ? 'Unselect' : 'Select All'}
                            </Button>
                            <Button
                                variant="danger"
                                className={`mx-1 ${isAllChecked ? "d-block" : "d-none"}`}
                                onClick={() => {
                                    this.setState({
                                        isConfirmModalVisible: !this.state.isConfirmModalVisible
                                    });
                                }}
                            >
                                Remove
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
                                    handleRemoveSingleTask={this.handleRemoveSingleTask}
                                    toggleSetRemoveTaskId={this.toggleSetRemoveTaskId}
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

export default ToDoContainer;
