import React, { Component } from 'react';
import {Form, Button, Container} from 'react-bootstrap';

const { Control } = Form;

class AddNewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            inputValue: value
        });
    }

    handleOnKeyPress = ({ key, type }) => {
        if (type === 'keypress' && key !== 'Enter') return;

        const { inputValue } = this.state;
        const { handleSubmit } = this.props;

        handleSubmit(inputValue);
        this.setState({
            inputValue: ''
        });
    }

    render() {
        const { disabled } = this.props;
        const { inputValue } = this.state;

        return (
            <Container className="d-flex justify-content-center mt-4">
                <Control
                    type="text"
                    value={inputValue}
                    disabled={disabled}
                    placeholder="Take a note..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleOnKeyPress}
                />
                <Button
                    className="mx-2"
                    variant="primary"
                    disabled={!!!inputValue}
                    onClick={this.handleOnKeyPress}
                >
                    Add
                </Button>
            </Container>
        );
    }
}

export default AddNewTask;
