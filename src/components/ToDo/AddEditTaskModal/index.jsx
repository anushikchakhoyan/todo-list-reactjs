import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const {Header, Title, Body, Footer} = Modal;
const { Control } = Form;

class AddEditTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: "",
            title: "",
            ...props.editableTask
        }
        this.inputReference = React.createRef();
    }

    componentDidMount() {
        this.inputReference.current.focus();
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleOnKeyPress = ({ type, key }) => {
        const { title, description } = this.state;
        const { onSubmit, onHide } = this.props;
        if ((type === 'keypress' && key !== 'Enter') || (!title || !description)) return;

        onSubmit(this.state);
        onHide();
    }

    render() {
        const { modalTitle, onHide, isShow } = this.props;
        const { title, description } = this.state;

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
                </Body>
                <Footer className="border-0 custom-modal-footer">
                    <Button onClick={onHide} variant="secondary">Cancel</Button>
                    <Button onClick={this.handleOnKeyPress}  disabled={!(!!title && !!description)} variant="primary">Confirm</Button>
                </Footer>
            </Modal>
        );

    }
}

export default AddEditTaskModal;
