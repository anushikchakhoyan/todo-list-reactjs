import React, {Component} from 'react';
import {Col} from "react-bootstrap";

import ContactForm from "../../components/ContactForm";
import './index.css';

class ContactUsContainer extends Component {
    render() {
        return (
            <Col lg={4} className="form-wrapper bg-white mx-auto p-2">
                <div className="d-flex justify-content-center align-items-center flex-column pt-5 pb-3">
                    <h1>Contact Us</h1>
                    <small>If you have questions or just want to get in touch, use the form below.</small>
                    <small>We look forward to hearing from you!</small>
                </div>
                <ContactForm />
            </Col>
        )
    }
}

export default ContactUsContainer;
