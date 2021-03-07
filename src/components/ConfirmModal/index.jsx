import React from 'react';
import PropTypes from "prop-types";
import {Modal, Button} from "react-bootstrap";
import {IoWarningOutline} from "react-icons/all";

const {Header, Title, Body, Footer} = Modal;

const ConfirmModal = ({onClose, onSubmit, isShow, message}) => {
    const handleSubmit = () => {
        onSubmit();
        onClose();
    }
    return (
        <Modal
            show={isShow}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
        >
            <Header closeButton className="border-0">
                <Title className="d-flex align-items-center custom-modal-title">
                    <IoWarningOutline className="mx-3" />
                     Are you sure?
                </Title>
            </Header>
            <Body>
                <p className="text-center">{message}</p>
            </Body>
            <Footer className="border-0 custom-modal-footer">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={handleSubmit}>Confirm</Button>
            </Footer>
        </Modal>
    )
}

ConfirmModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ConfirmModal;
