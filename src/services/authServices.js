import api from './config';

export const isUserLoggedIn = async () => {
    const user = localStorage.getItem('token') || localStorage.getItem('token')

    return await api.get('/isUserLoggedIn', 
    {
        params: {
            user: user
          }
    })
    .then(response => {
        if(response.status === 200) {
            console.log(response);
        }
    }).catch(err => {
        return err.response;
    })
}