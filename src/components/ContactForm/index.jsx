import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import AppLoading from "../AppLoading";

const customInput= [
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
        name: "phoneNumber",
        label: "Phone Number",
        type: "number",
    },
    {
        name: "message",
        label: "Message",
        as: "textarea",
        rows: 3,
        maxLength: 100,
    },

]

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: "",
            phoneNumber: "",
            isLoading: false
        }
    }

    handleSubmit = () => {
        const formData = {...this.state};
        this.setState({isLoading: true});
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
                this.props.history.push("/");
            })
            .catch(error => {
                console.error("catch Error", error);
            })
            .finally(() => {
                this.setState({isLoading: false});
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const {isLoading} = this.state;

        if (isLoading) {
            return <AppLoading />
        }

        return (
            <Form className="px-5 pt-2 pb-5" onSubmit={(e) => e.preventDefault()}>
                    {customInput.map((input, index) => (
                        <Form.Group
                            key={index}
                            controlId={input.name}
                        >
                            <Form.Label>{input.label}</Form.Label>
                            <Form.Control
                                name={input.name}
                                type={input.type}
                                as={input.as}
                                rows={input.rows}
                                placeholder={input.label}
                                maxLength={input.maxLength}
                                onChange={this.handleChange}
                                value={this.state[input.name]}
                            />
                        </Form.Group>
                    ))}
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" type="submit"
                                onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </Form>
        );
    }
}

export default ContactForm;
