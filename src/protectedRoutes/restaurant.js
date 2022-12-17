import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const RestaurantRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
        {...rest}
        render={
            props=>isAuthenticated() && isAuthenticated().user && isAuthenticated().user.role=='restaurant' ? (
                <Component />
            ):(
                <Redirect 
                to={{
                    pathname: "/",
                    state: {from: props.location}
                }}/>
            )
        } />
    )
}

export default RestaurantRoute;