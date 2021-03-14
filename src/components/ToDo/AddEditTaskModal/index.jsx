import React from 'react';
import DatePicker from "react-datepicker";
import {Modal, Button, Form} from 'react-bootstrap';

import formatDate from "../../../helpers/date.helper";

const {Header, Title, Body, Footer} = Modal;
const {Control} = Form;

class AddEditTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            ...props.editableTask,
            date: props.editableTask ? new Date(props.editableTask.date) : new Date()
        }
        this.inputReference = React.createRef();
    }

    componentDidMount() {
        this.inputReference.current.focus();
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleOnKeyPress = ({type, key}) => {
        const {onSubmit, onHide} = this.props;
        const {title, description} = this.state;
        if ((type === 'keypress' && key !== 'Enter') || (!title || !description)) return;

        const formData = { ...this.state };
        formData.date = formatDate(formData.date);
        onSubmit(formData);
        onHide();
    }

    render() {
        const {modalTitle, onHide, isShow} = this.props;
        const {date, title, description} = this.state;

        return (
            <Modal
                size="lg"
                show={isShow}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
            >
                <Header closeButton className="border-0">
                    <Title>
                        {modalTitle}
                    </Title>
                </Header>
                <Body className="d-flex flex-column align-items-center">
                    <Control
                        name="title"
                        type="text"
                        value={title}
                        placeholder="Title"
                        ref={this.inputReference}
                        onChange={this.handleChange}
                        onKeyPress={this.handleOnKeyPress}
                    />
                    <Control
                        rows={5}
                        as="textarea"
                        className="my-3"
                        name="description"
                        value={description}
                        placeholder="Description"
                        onChange={this.handleChange}
                    />
                    <DatePicker
                        selected={date}
                        onChange={date => this.setState({date})}
                    />
                </Body>
                <Footer className="border-0 custom-modal-footer">
                    <Button onClick={onHide} variant="secondary">Cancel</Button>
                    <Button onClick={this.handleOnKeyPress} disabled={!(!!title && !!description)}
                            variant="primary">Confirm</Button>
                </Footer>
            </Modal>
        );

    }
}

export default AddEditTaskModal;
