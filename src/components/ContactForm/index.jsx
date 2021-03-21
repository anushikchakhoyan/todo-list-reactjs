import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';

import NotificationTypes from "../../constants/NotificationTypes";
import AlertMessage from "../AlertMessage";
import AppLoading from "../AppLoading";
import {
    minLength,
    maxLength,
    isAllValid,
    isRequired,
    emailValidation
} from "./validationScheme";

const {Text, Group, Control} = Form;
const customInput = [
    {
        name: "name",
        label: "Name",
        type: "text",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
    },
    {
        name: "message",
        label: "Message",
        as: "textarea",
        rows: 3,
        maxLength: 100,
    }
]

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: "",
                valid: false,
                error: null
            },
            email: {
                value: "",
                valid: false,
                error: null
            },
            message: {
                value: "",
                valid: false,
                error: null
            },
            isValid: false,
            showErrorMessageAlert: false,
            showSuccessMessageAlert: false,
        }
    }

    handleSubmit = () => {
        const formData = {...this.state};
        for (let key in formData) {
            formData[key] = formData[key].value;
        }

        fetch("http://localhost:3001/form", {
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
                this.setState({showSuccessMessageAlert: true});
            })
            .catch((error) => {
                this.setState({showErrorMessageAlert: true});
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        let error = null;
        const maxLength50 = maxLength(50);
        const minLength2 = minLength(2);

        switch (name) {
            case "name":
            case "email":
            case "message":
                error = isRequired(value) ||
                    (name === "email" && emailValidation(value)) ||
                    minLength2(value) ||
                    maxLength50(value);
                break;
            default:;
        }

        this.setState({
            [name]: {
                value,
                valid: !!!error,
                error
            },
            isValid: isAllValid(this.state)
        });
    }

    render() {
        const {isLoading, showSuccessMessageAlert, showErrorMessageAlert} = this.state;

        if (isLoading) {
            return <AppLoading/>
        }

        return (
            <>
                <Form className="p-5" onSubmit={(e) => e.preventDefault()}>
                    {customInput.map((input, index) =>
                        (
                            <Group
                                key={index}
                                controlId={input.name}
                            >
                                <Control
                                    name={input.name}
                                    type={input.type}
                                    as={input.as}
                                    rows={input.rows}
                                    placeholder={input.label}
                                    maxLength={input.maxLength}
                                    onChange={this.handleChange}
                                    value={this.state[input.name].value}
                                />
                                <Text style={{color: "red"}}>{this.state[input.name].error}</Text>
                            </Group>
                        )
                    )}
                    <div className="d-flex justify-content-center align-items-center pt-4">
                        <Button
                            type="submit"
                            variant="secondary"
                            className="form-btn"
                            onClick={this.handleSubmit}
                            disabled={!this.state.isValid}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
                {showSuccessMessageAlert && (
                    <AlertMessage
                        show={true}
                        variant={NotificationTypes.SUCCESS}
                        text="Thank you! Your info sent successfully!"
                        onClose={() => this.setState({showSuccessMessageAlert: !this.state.showSuccessMessageAlert})}
                    />
                )}
                {showErrorMessageAlert && (
                    <AlertMessage
                        show={true}
                        variant={NotificationTypes.ERROR}
                        text="Oops! Something went wrong!"
                        onClose={() => this.setState({showErrorMessageAlert: !this.state.showErrorMessageAlert})}
                    />
                )}
            </>
        );
    }
}

export default ContactForm;
