import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, Button, Card, Col, Container, Row} from "react-bootstrap";

import HttpStatusCode from "../../constants/HttpStatusCode";
import ConfirmModal from "../../components/ConfirmModal";
import AppLoading from "../../components/AppLoading";
import formatDate from "../../helpers/date.helper";
import AddEditTaskModal from "../../components/ToDo/AddEditTaskModal";

class TaskDetailsContainer extends Component {
    state = {
        task: {},
        isLoading: false,
        isEditModalVisible: false,
        isConfirmModalVisible: false
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {history} = this.props;

        this.setState({isLoading: true});
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.setState({
                    task: data
                });
            })
            .catch(error => {
                if (error.status === HttpStatusCode.SOMETHING_WENT_WRONG) {
                    return history.push('/404');
                }
            })
            .finally(() => {
                this.setState({isLoading: false})
            })
    }

    handleRemoveSingleTask = () => {
        const {id} = this.props.match.params;
        this.setState({isLoading: true});
        fetch(`http://localhost:3001/task/${id}`, {
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
                this.setState({isLoading: false})
            })
    }

    handleEditTask = (formData) => {
        fetch("http://localhost:3001/task/" + formData._id, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                this.setState({
                    task: data
                });
            })
            .catch(error => {
                console.log("Single Task Page,Edit Task Error", error);
            });
    }

    handleModalClose = () => {
        const {history} = this.props;
        this.setState({isConfirmModalVisible: !this.state.isConfirmModalVisible})
        history.push("/");
    }

    render() {
        const {task, isLoading, isEditModalVisible, isConfirmModalVisible} = this.state;

        if (isLoading) {
            return <AppLoading/>
        }

        return (
            <Container>
                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link to="/">Tasks</Link>
                    </li>
                    <li className="breadcrumb-item active">{task._id}</li>
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
                                            Created at: <cite title="Created date">{formatDate(task.created_at)}</cite>
                                        </footer>
                                    )}
                                    {task.date && (
                                        <footer className="blockquote-footer">
                                            Updated at: <cite title="Updated date">{formatDate(task.date)}</cite>
                                        </footer>
                                    )}
                                </blockquote>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={2} className="d-flex flex-column">
                        <Button variant="outline-secondary" className="mb-2"
                                onClick={() => {
                                    this.setState({
                                        isEditModalVisible: !this.state.isEditModalVisible
                                    })
                                }}
                        >Edit</Button>
                        <Button variant="outline-secondary" className="mb-2"
                                onClick={() => {
                                    this.setState({
                                        isConfirmModalVisible: !this.state.isConfirmModalVisible
                                    })
                                }}>Delete</Button>
                    </Col>
                </Row>
                {isConfirmModalVisible && <ConfirmModal
                    isShow={true}
                    onClose={this.handleModalClose}
                    onSubmit={this.handleRemoveSingleTask}
                    message={`Would you like to remove task?`}
                />}
                {isEditModalVisible && <AddEditTaskModal
                    isShow={true}
                    modalTitle="Edit Task"
                    editableTask={task}
                    onSubmit={this.handleEditTask}
                    onHide={() => {
                        this.setState({isEditModalVisible: null})
                    }}
                />}
            </Container>
        )
    }
}


export default TaskDetailsContainer;
