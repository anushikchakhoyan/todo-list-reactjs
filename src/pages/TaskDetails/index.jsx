import React, {useCallback, useEffect, useReducer} from 'react';

import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import {Breadcrumb, Button, Card, Col, Container, Row} from "react-bootstrap";

import AddEditTaskModal from "../../components/ToDo/AddEditTaskModal";
import HttpStatusCode from "../../constants/HttpStatusCode";
import ConfirmModal from "../../components/ConfirmModal";
import AppLoading from "../../components/AppLoading";
import formatDate from "../../helpers/date.helper";
import {config} from "../../config";

const initialState = {
    task: {},
    isLoading: false,
    isEditModalVisible: false,
    isConfirmModalVisible: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "toggleEditModal":
            return {
                ...state,
                isEditModalVisible: !state.isEditModalVisible
            }
        case "toggleConfirmModal":
            return {
                ...state,
                isConfirmModalVisible: !state.isConfirmModalVisible
            }
        case "toggleLoading":
            return {
                ...state,
                isLoading: action.isLoading
            }
        case "setTaskData":
            return {
                ...state,
                task: action.task
            }
        default:
            throw new Error();
    }
}

const TaskDetailsContainer = props => {
    const {
        match: {
            params: { id }
        }
    } = props;
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        task,
        isLoading,
        isEditModalVisible,
        isConfirmModalVisible
    } = state;

    useEffect(() => {
        dispatch({type: "toggleLoading", isLoading: true});
        fetch(`${config.baseURL}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                dispatch({type: "setTaskData", task: data});
            })
            .catch(error => {
                if (error.status === HttpStatusCode.SOMETHING_WENT_WRONG) {
                    return history.push('/404');
                }
            })
            .finally(() => {
                dispatch({type: "toggleLoading", isLoading: false});
            })
    }, [history])

    const handleRemoveSingleTask = useCallback(() => {
        dispatch({type: "toggleLoading", isLoading: true});
        fetch(`${config.baseURL}/task/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
            })
            .catch(error => {
                console.error("Delete single task Request Error", error);
            })
            .finally(() => {
                dispatch({type: "toggleLoading", isLoading: false});
            })
    }, [id]);

    const handleEditTask = useCallback((formData) => {
        dispatch({ type: "toggleLoading", isLoading: true });
        fetch(`${config.baseURL}/task/${formData._id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                dispatch({ type: "setTaskData", task: data });
            })
            .catch(error => {
                console.error("Single Task Page,Edit Task Error", error);
            })
            .finally(() => {
                dispatch({ type: "toggleLoading", isLoading: false });
            })
    }, []);

    const handleModalClose = () => {
        dispatch({type: "toggleConfirmModal"});
        history.push("/");
    }

    if (isLoading) {
        return <AppLoading/>
    }

    return (
        <Container>
            <Breadcrumb>
                <li className="breadcrumb-item">
                    <Link to="/">Tasks</Link>
                </li>
                <li className="breadcrumb-item active">{id}</li>
            </Breadcrumb>
            <Row>
                <Col lg={10}>
                    <Card>
                        <Card.Header>{task.title}</Card.Header>
                        <Card.Body>
                            <div className="py-4">
                                <p className="font-weight-bold">Description</p>
                                <p>{task.description}</p>
                            </div>
                            <blockquote className="blockquote mb-0">
                                {task.created_at && (
                                    <footer className="blockquote-footer">
                                        Created at: <cite
                                        title="Created date">{formatDate(task.created_at)}</cite>
                                    </footer>
                                )}
                                {task.date && (
                                    <footer className="blockquote-footer">
                                        Updated at: <cite
                                        title="Updated date">{formatDate(task.date)}</cite>
                                    </footer>
                                )}
                            </blockquote>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} className="d-flex flex-column">
                    <Button variant="outline-secondary"
                            className="mb-2"
                            onClick={() => dispatch({ type: "toggleEditModal" })}
                    >Edit</Button>
                    <Button variant="outline-secondary"
                            className="mb-2"
                            onClick={() => dispatch({ type: "toggleConfirmModal" })}
                    >Delete</Button>
                </Col>
            </Row>
            {isConfirmModalVisible && <ConfirmModal
                isShow={true}
                onClose={handleModalClose}
                onSubmit={handleRemoveSingleTask}
                message={`Would you like to remove task?`}
            />}
            {isEditModalVisible && <AddEditTaskModal
                isShow={true}
                modalTitle="Edit Task"
                editableTask={task}
                onSubmit={handleEditTask}
                onHide={() => dispatch({ type: "toggleEditModal" })}
            />}
        </Container>
    )
}


export default TaskDetailsContainer;
