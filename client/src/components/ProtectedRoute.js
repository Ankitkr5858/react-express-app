import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from "react-redux";

export const ProtectedRoute = ({component: Component, user, ...rest}) => {
    return (<Route {...rest} render={props => (
        user && user.accessToken
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>)
};

function mapState(state) {
    const {user} = state.authenticationReducer;
    return {user};
}

export default connect(mapState, {})(ProtectedRoute);
