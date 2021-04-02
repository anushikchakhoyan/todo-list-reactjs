import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ Component, Provider, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            return (
                Provider ? (
                    <Provider>
                        <Component {...props} />
                    </Provider>
                ) : <Component {...props} />
            );
        }}
    />
);

export default PublicRoute;
