import React  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
                        component: ToDoContainer
                },
                {
                        path: "/contact-us",
                        component: ContactUsContainer
                },
                {
                        path: "/about",
                        component: AboutContainer
                },
                {
                        path: "/tasks/:id",
                        component: TaskDetailsContainer
                }
        ]

        return (
            <Switch>
                    {pages.map((page, index) => (
                        <PublicRoute exact key={index} path={page.path} component={page.component} />
                    ))}
                    <Route exact path="/404" component={NotFoundContainer} />
                    <Redirect to="/404" />
            </Switch>
        );
}

export default Routes;
