import React from 'react'
import {Route, Redirect} from 'react-router-dom';

function AdminRoute({email: email, accountType: accountType, component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if(email !== '' && accountType === 'Admin') {
                return <Component />
            }
            else {
                return (
                    <Redirect to={{pathname: "/login", state:{from: props.location}}} />
                );
            }
        }} />
    )
}

export default AdminRoute

