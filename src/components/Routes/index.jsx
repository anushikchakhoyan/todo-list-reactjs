import React  from 'react';
import { Route, Switch } from 'react-router-dom';

import ContactUsContainer from "../../containers/ContactUs";
import NotFoundContainer from "../../containers/NotFound";
import AboutContainer from "../../containers/About";
import ToDoContainer from "../../containers/ToDo";

import PublicRoute from "../PublicRoute";

const Routes = () => (
    <Switch>
        <PublicRoute exact path="/" component={ToDoContainer} />
        <PublicRoute exact path="/about" component={AboutContainer} />
        <PublicRoute exact path="/contact-us" component={ContactUsContainer} />
        <Route exact path="*" component={NotFoundContainer} />
    </Switch>
);

export default Routes;
