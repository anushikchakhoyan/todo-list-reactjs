import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import ContactContextProvider from "../../context/ContactContextProvider";

import TaskDetailsContainer from "../../pages/TaskDetails";
import ContactUsContainer from "../../pages/ContactUs";
import NotFoundContainer from "../../pages/NotFound";
import AboutContainer from "../../pages/About";
import ToDoContainer from "../../pages/ToDo";

import PublicRoute from "../PublicRoute";

const Routes = () => {
    const pages = [
        {
            path: "/",
            Component: ToDoContainer
        },
        {
            path: "/contact-us",
            Component: ContactUsContainer,
            Provider: ContactContextProvider,
        },
        {
            path: "/about",
            Component: AboutContainer
        },
        {
            path: "/tasks/:id",
            Component: TaskDetailsContainer
        }
    ]

    return (
        <Switch>
            {pages.map((page, index) => {
                const {path, Provider, Component} = page;
                return (
                    <PublicRoute exact  key={index}  path={path} Component={Component} Provider={Provider}/>
                )
            })}
            <Route exact path="/404" component={NotFoundContainer}/>
            <Redirect to="/404"/>
        </Switch>
    );
}

export default Routes;
