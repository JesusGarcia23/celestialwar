import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import Loading from '../Loading';
import { Redirect, Route} from 'react-router-dom';
import { userLogIn } from '../../sockets/emit/userEmit';
import { isUserLoggedIn } from '../../services/authServices';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const MyContext = useContext(Context);

    const { user } = MyContext;

    console.log(user);

    useEffect(() => {
        if(user && !user.accepted || !user) {
            userLogIn();
        }
    }, [])

    const ComponentToRender = (props) => {
        if(user === null) {
            return <Loading/>
        }
        else if(!user.accepted) {
            return <Redirect to='/'/>
        }
        return <Component {...props} />

    }

    return <Route {...rest} render={(props) => (
            ComponentToRender(props)
        )} 
    />
}

export default PrivateRoute;