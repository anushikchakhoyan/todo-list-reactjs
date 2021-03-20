import React, {Component} from 'react';
import {Container, Row} from "react-bootstrap";

import ContactForm from "../../components/ContactForm";
import './index.css';

class ContactUsContainer extends Component {
    render() {
        return (
            <Container className="form-wrapper bg-white mx-auto p-2">
               <Row className="justify-content-center align-items-center pt-5"><h1>Contact Us</h1></Row>
                <ContactForm />
            </Container>
        )
    }
}


export default ContactUsContainer;
