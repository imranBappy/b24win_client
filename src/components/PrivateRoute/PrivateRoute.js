import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({children, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({location})=>auth.isAuthenticated?(children):(<Redirect
                to={{
                    pathname:"/login",
                    state:{from: location}
                }}
            />)}
        />
    );
};

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);