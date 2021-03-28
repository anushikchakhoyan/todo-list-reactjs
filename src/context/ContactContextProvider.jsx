import React, { createContext, useState } from 'react';

import {
    isRequired,
    maxLength,
    minLength,
    emailValidation
} from '../helpers/validationScheme';
import HttpStatusCode from "../constants/HttpStatusCode";

export const ContactContext = createContext();

const ContactContextProvider = ({
                                    history,
                                    ...props
                                }) => {
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

    return <ContactContext.Provider
        value={
            {
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
            }
        }
    >
        {props.children}
    </ContactContext.Provider>
}


export default ContactContextProvider;
