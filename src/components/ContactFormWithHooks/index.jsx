import React, {useContext} from 'react';
import {Form, Button} from 'react-bootstrap';

import NotificationTypes from "../../constants/NotificationTypes";
import {ContactContext} from "../../context/ContactContextProvider";
import AlertMessage from "../AlertMessage";
import AppLoading from "../AppLoading";

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

    const context = useContext(ContactContext);
    const {
        errors,
        formData,
        isLoading,
        handleChange,
        handleSubmit,
        errorMessageText,
        showErrorMessageAlert,
        showSuccessMessageAlert,
        setShowErrorMessageAlert,
        setShowSuccessMessageAlert
    } = context;

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
