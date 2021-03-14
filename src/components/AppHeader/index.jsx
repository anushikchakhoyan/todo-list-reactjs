import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

import AppLogo from "../../assets/portfolio.png";
import styles from "./index.module.css";

const {Link} = Nav;
const {Brand, Toggle, Collapse} = Navbar;

const AppHeader = () => (
    <Navbar collapseOnSelect expand="lg" className={styles.customNavbar}>
        <Brand as={NavLink} to="/">
            <img src={AppLogo} alt="logo" className={styles.appLogo}/>
        </Brand>
        <Toggle aria-controls="responsive-navbar-nav" />
        <Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
                 <Link as={NavLink} to="/" exact activeClassName={styles.active}>ToDo</Link>
                 <Link as={NavLink} to="/contact-us" exact activeClassName={styles.active}>Contact Us</Link>
                 <Link as={NavLink} to="/about" exact activeClassName={styles.active}>About Us</Link>
            </Nav>
        </Collapse>
    </Navbar>
)

export default AppHeader;
