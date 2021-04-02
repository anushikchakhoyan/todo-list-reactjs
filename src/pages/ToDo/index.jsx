import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Button} from "react-bootstrap";

import AddEditTaskModal from "../../components/ToDo/AddEditTaskModal";
import ConfirmModal from "../../components/ConfirmModal";
import Notification from "../../components/Notification";
import AppLoading from "../../components/AppLoading";
import Task from "../../components/ToDo/TaskItem";
import {config} from "../../config";

const ToDoContainer = () => {
    const [tasks, setTasks] = useState([]);
    const [removeTasks, setRemoveTasks] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [editableTask, setEditableTask] = useState(null);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const handleSubmit = (formData) => {
        if (!formData.title || !formData.description) return;

        setIsLoading(true);
        fetch(`${config.baseURL}/task`, {
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
                setTasks(tasks);
            })
            .catch(error => {
                console.error("catch Error", error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggleSetRemoveTaskId = (_id) => {
        let removeTasksItems = new Set(removeTasks);
        removeTasksItems.has(_id) ? removeTasksItems.delete(_id) : removeTasksItems.add(_id);
        setRemoveTasks(removeTasksItems);
    }

    const handleRemoveSingleTask = (_id) => {
        setIsLoading(true);
        fetch(`${config.baseURL}/task/${_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                setTasks(tasks.filter(item => item._id !== _id))
            })
            .catch(error => {
                console.error("Delete TaskItem By ID Request Error", error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleRemoveSelectedTasks = () => {
        setIsLoading(true);
        fetch(`${config.baseURL}/task`, {
            method: "PATCH",
            body: JSON.stringify({tasks: Array.from(removeTasks)}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                setTasks(tasks.filter(item => !removeTasks.has(item._id)));
                setRemoveTasks(new Set());
                setIsAllChecked(false);
            })
            .catch(error => {
                console.error("Bulk Delete Tasks Request Error", error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleToggleSelectAllTask = () => {
        let removeToggleTasks = new Set();
        if (!isAllChecked) {
            removeToggleTasks = new Set(removeTasks);
            tasks.forEach(task => {
                removeToggleTasks.add(task._id)
            });
        }
        setRemoveTasks(removeToggleTasks);
        setIsAllChecked(!isAllChecked);
    }

    const handleEditTask = (editTask) => {
        setIsLoading(true);
        const {_id} = editTask;
        fetch(`${config.baseURL}/task/${_id}`, {
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
                const idx = tasks.findIndex(task => task._id === data._id);
                tasks[idx] = data;
                setTasks(tasks);
            })
            .catch(error => {
                console.error("Edit Tasks Request Error", error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(`${config.baseURL}/task`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                setTasks(data);
            })
            .catch(error => {
                console.error("Get Tasks Request Error", error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return <AppLoading/>
    }

    return (
        <>
            <Container fluid>
                <Row className="my-4">
                    <Col className="d-flex justify-content-end">
                        <Button disabled={!!removeTasks.size}
                                variant="secondary"
                                onClick={() => setIsAddTaskModalVisible(!isAddTaskModalVisible)}
                        >
                            Add Task
                        </Button>
                        <Button
                            className="mx-1"
                            variant="secondary"
                            disabled={!!!tasks.length}
                            onClick={handleToggleSelectAllTask}
                        >
                            {isAllChecked ? 'Unselect' : 'Select All'}
                        </Button>
                        <Button
                            variant="danger"
                            className="mx-1"
                            disabled={!!!removeTasks.size}
                            onClick={() => setIsConfirmModalVisible(!isConfirmModalVisible)}
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
                                handleSetEditTask={(task) => setEditableTask(task)}
                                handleRemoveSingleTask={handleRemoveSingleTask}
                                toggleSetRemoveTaskId={toggleSetRemoveTaskId}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            {isConfirmModalVisible &&
            <ConfirmModal
                isShow={true}
                onSubmit={handleRemoveSelectedTasks}
                message={`Would you like to remove  ${removeTasks.size} task(s)? `}
                onClose={() => setIsConfirmModalVisible(!isConfirmModalVisible)}
            />}
            {editableTask &&
            <AddEditTaskModal
                isShow={true}
                modalTitle="Edit Task"
                editableTask={editableTask}
                onSubmit={handleEditTask}
                onHide={() => setEditableTask(null)}
            />}
            {isAddTaskModalVisible &&
            <AddEditTaskModal
                isShow={true}
                modalTitle="Add Task"
                editableTask={editableTask}
                onSubmit={handleSubmit}
                onHide={() => setIsAddTaskModalVisible(!isAddTaskModalVisible)}
            />}
        </>
    )
}

export default ToDoContainer;
