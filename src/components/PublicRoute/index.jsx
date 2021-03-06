import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import Loading from '../Loading';
import { Redirect, Route} from 'react-router-dom';
import { userLogIn } from '../../sockets/emit/userEmit';
import { isUserLoggedIn } from '../../services/authServices';

const PublicRoute = ({ component: Component, ...rest }) => {

    const MyContext = useContext(Context);

    const token = localStorage.getItem('token');

    const { user } = MyContext;

    useEffect(() => {
        if(user && !user.accepted || !user) {
            userLogIn();
        }
    }, [])

    const ComponentToRender = (props) => {
        if(user === null && (token !== null && token !== "" )) {
            return <Loading/>
        }
        else if(user && user.accepted) {
            return <Redirect to='/lobby'/>
        }
        return <Component {...props} />

    }

    return <Route {...rest} render={(props) => (
            ComponentToRender(props)
        )} 
    />
}

export default PublicRoute;