import React from "react";
import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap';
import {TiWarningOutline} from "react-icons/all";

const Notification = ({text, variant}) => (
    <Alert variant={variant} className="mx-auto d-flex align-items-center">
        <TiWarningOutline size="30px" className="mr-2"/>
        <span>{text}</span>
    </Alert>
)

Notification.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired
};

export default Notification;
