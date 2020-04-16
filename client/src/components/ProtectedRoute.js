import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const userData = JSON.parse(localStorage.getItem('user') || "{}");

    return (<Route {...rest} render={props => (
        userData.accessToken
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>)
};

export default ProtectedRoute;
