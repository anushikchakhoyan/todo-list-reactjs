import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

import "./index.css";

const NotFoundContainer = () => (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <p className="not-found-number">404</p>
        <p className="not-found-text">
            OOPS! Page Not Found <br />
            We are sorry, but the page you requested was not found <br />
            <Link to="/" className="mt-3 d-block">
                <Button variant="secondary" className="font-weight-bold">Go Back home</Button>
            </Link>
        </p>
    </div>
);

export default NotFoundContainer;
