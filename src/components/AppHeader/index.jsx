import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

import AppLogo from "../../assets/portfolio.png";
import styles from "./index.module.css";

const {Brand, Toggle, Collapse} = Navbar;
const {Link} = Nav;

const AppHeader = () => {
    const navmenuItems = [
        {
            to: "/",
            title: "Tasks"
        },
        {
            to: "/contact-us",
            title: "Contact us"
        },
        {
            to: "/about",
            title: "About Us"
        }
    ]

    return (
        <Navbar collapseOnSelect expand="lg" className={styles.customNavbar}>
            <Brand as={NavLink} to="/">
                {/*<img src={AppLogo} alt="logo" className={styles.appLogo}/>*/}
                Test
            </Brand>
            <Toggle aria-controls="responsive-navbar-nav" />
            <Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {navmenuItems.map((item, index) => (
                        <Link as={NavLink} key={index} to={item.to} exact activeClassName={styles.active}>{item.title}</Link>
                    ))}
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default AppHeader;
