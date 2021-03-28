import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

import NotificationTypes from "../../constants/NotificationTypes";
import AlertMessage from "../AlertMessage";
import {
    minLength,
    maxLength,
    isRequired,
    emailValidation
} from "../../helpers/validationScheme";
import AppLoading from "../AppLoading";
import HttpStatusCode from "../../constants/HttpStatusCode";

const {Text, Group, Control} = Form;

const ContactFormWithHooks = () => {
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

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessageText, setErrorMessageText] = useState("");
    const [showErrorMessageAlert, setShowErrorMessageAlert] = useState(false);
    const [showSuccessMessageAlert, setShowSuccessMessageAlert] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        let valid = !errors.name && !errors.email && !errors.message

        if(valid) {
            setIsLoading(true);
            fetch("http://localhost:3001/form", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        throw data.error;
                    }
                    setShowSuccessMessageAlert(true);
                })
                .catch(error => {
                    if (error.status === HttpStatusCode.UNPROCESSABLE_ENTITY) {
                        setShowErrorMessageAlert(true);
                        setErrorMessageText(error.message);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        const maxLength50 = maxLength(50);
        const minLength2 = minLength(2);

        switch (name) {
            case 'name':
                errors.name = isRequired(value) || minLength2(value) || maxLength50(value);
                break;
            case 'email':
                errors.email = isRequired(value) || emailValidation(value);
                break;
            case 'message':
                errors.message = isRequired(value) || minLength2(value);
                break;
            default:
                break;
        }

        setErrors({...errors});
        setFormData({
            ...formData,
            [name]: value
        });
    }

    if (isLoading) {
        return <AppLoading/>
    }

    return (
        <>
            <Form className="p-5" onSubmit={handleSubmit}>
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
                                onChange={handleChange}
                                value={formData[input.name].value}
                            />
                            <Text style={{color: "red"}}>{errors[input.name]}</Text>
                        </Group>
                    )
                )}
                <div className="d-flex justify-content-center align-items-center pt-4">
                    <Button
                        type="submit"
                        variant="secondary"
                        className="form-btn"
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
                    onClose={() => setShowSuccessMessageAlert(!showSuccessMessageAlert)}
                />
            )}
            {showErrorMessageAlert && (
                <AlertMessage
                    show={true}
                    variant={NotificationTypes.ERROR}
                    onClose={() => setShowErrorMessageAlert(!showErrorMessageAlert)}
                    text={errorMessageText ? errorMessageText : "Oops! Something went wrong!" }
                />
            )}
        </>
    );
}

export default ContactFormWithHooks;
