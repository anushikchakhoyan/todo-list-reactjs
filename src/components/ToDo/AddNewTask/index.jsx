import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Container} from 'react-bootstrap';

const { Control } = Form;

class AddNewTask extends Component {
    constructor(props) {
        super(props);
        this.inputReference = React.createRef();
        this.state = {
            title: '',
            description: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleOnKeyPress = ({ key, type }) => {
        if (type === 'keypress' && key !== 'Enter') return;

        const { handleSubmit } = this.props;
        const { title, description } = this.state;
        const formData = {
            title,
            description
        };
        handleSubmit(formData);
        this.setState({
            title: '',
            description: ''
        });
    }

    componentDidMount() {
        this.inputReference.current.focus();
    }

    render() {
        const { disabled } = this.props;
        const {  title, description } = this.state;

        return (
            <Container className="d-flex flex-column align-items-center justify-content-center mt-4">
                <Control
                    type="text"
                    name="title"
                    value={title}
                    className="my-2"
                    disabled={disabled}
                    ref={this.inputReference}
                    placeholder="Title"
                    onChange={this.handleChange}
                    onKeyPress={this.handleOnKeyPress}
                />
                <Control
                    rows={3}
                    type="text"
                    as="textarea"
                    className="my-2"
                    name="description"
                    value={description}
                    placeholder="Description"
                    onChange={this.handleChange}
                />
                <Button
                    className="mx-2"
                    variant="primary"
                    onClick={this.handleOnKeyPress}
                    disabled={!(!!title && !!description)}
                >
                    Add
                </Button>
            </Container>
        );
    }
}

AddNewTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default AddNewTask;
