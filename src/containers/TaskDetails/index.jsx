import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, Button, Card, Col, Container, Row} from "react-bootstrap";

import formatDate from "../../helpers/date.helper";
import ConfirmModal from "../../components/ConfirmModal";

class TaskDetailsContainer extends Component {
    state = {
        task: {},
        isConfirmModalVisible: false
    }

    componentDidMount() {
        const {id} = this.props.match.params;
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
                console.error("Get Single Task Request Error", error);
            });
    }

    handleRemoveSingleTask = () => {
        const {id} = this.props.match.params;
        fetch(`http://localhost:3001/task/${id}`, {
            method: "DELETE"
        })
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
                console.error("Delete single task Request Error", error);
            });
    }

    handleModalClose = () => {
        const { history } = this.props;
        this.setState({isConfirmModalVisible: !this.state.isConfirmModalVisible})
        history.push("/");
    }

    render() {
        const {task, isConfirmModalVisible} = this.state;
        const {Item} = Breadcrumb;

        if (!task) {
            return <div>
                <span>Loading...</span>
            </div>
        }

        return (
            <Container>
                <Breadcrumb>
                    <Item>
                        <Link to="/">Tasks</Link>
                    </Item>
                    <Item active>{task._id}</Item>
                </Breadcrumb>
                <Row>
                    <Col lg={10}>
                        <Card>
                            <Card.Header>{task.title}</Card.Header>
                            <Card.Body>
                                <div className="py-4">
                                    <p className="font-weight-bold">Desciption</p>
                                    <p>{task.description}</p>
                                </div>
                                <blockquote className="blockquote mb-0">
                                    {task.created_at && (
                                        <footer className="blockquote-footer">
                                            Created at: <cite title="Created date">{formatDate(task.created_at)}</cite>
                                        </footer>
                                    )}
                                    {task.updated_at && (
                                        <footer className="blockquote-footer">
                                            Updated at: <cite title="Updated date">{formatDate(task.updated_at)}</cite>
                                        </footer>
                                    )}
                                </blockquote>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={2} className="d-flex flex-column">
                        <Button variant="outline-secondary" className="mb-2">Edit</Button>
                        <Button variant="outline-secondary" className="mb-2" onClick={() => {
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
            </Container>
        )
    }
}


export default TaskDetailsContainer;
