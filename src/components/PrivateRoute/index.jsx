import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import Loading from '../Loading';
import { Redirect, Route} from 'react-router-dom';
import { isUserLoggedIn } from '../../services/authServices';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const MyContext = useContext(Context);

    const [ isLoading, setIsLoading ] = useState(true);

    const { user } = MyContext;

    console.log(user);

    useEffect(() => {
        isUserLoggedIn();
    }, [])

    const ComponentToRender = (props) => {
        if(isLoading) {
            return <Loading/>
        }
        else if(!isLoading && !user.accepted) {
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