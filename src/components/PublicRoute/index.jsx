import React, { useContext, useEffect } from 'react';
import Context from '../../Context/Context';
import Loading from '../Loading';
import { Redirect, Route} from 'react-router-dom';
import { isUserLoggedIn } from '../../services/authServices';

const PublicRoute = ({ component: Component, ...rest }) => {

    const MyContext = useContext(Context);

    const { user, isLoading } = MyContext;

    useEffect(() => {
        isUserLoggedIn();
    }, [])

    const ComponentToRender = (props) => {
        if(isLoading) {
            return <Loading/>
        }
        else if(!isLoading && user.accepted) {
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