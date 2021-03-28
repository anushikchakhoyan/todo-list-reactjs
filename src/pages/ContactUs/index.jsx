import React, {Component} from 'react';
import {Col} from "react-bootstrap";

import ContactFormWithHooks from "../../components/ContactFormWithHooks";
import './index.css';

class ContactUsContainer extends Component {
    render() {
        return (
            <Col sm={12} lg={8} xl={6} className="form-wrapper bg-white mx-auto p-2">
                <div className="d-flex justify-content-center align-items-center flex-column pt-5 pb-3">
                    <h1>Contact Us</h1>
                    <small>If you have questions or just want to get in touch, use the form below.</small>
                    <small>We look forward to hearing from you!</small>
                </div>
                <ContactFormWithHooks />
            </Col>
        )
    }
}

export default ContactUsContainer;
