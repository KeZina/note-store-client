import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const useUser = () => {
    const [name, setName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const login = async (login, password) => {
        setIsLoading(true);
        const response = await axios.post('/user/login', {
            name: login, 
            password
        });

        const {token, name, message, status} = await response.data;

        checkJwtExpired(message);

        if(token && name) {
            localStorage.setItem('token', token);
            setName(name);
        } else if(status === 0) alert(message.message);
        
        setIsLoading(false);
    }

    const createProfile = async (login, password) => {
        setIsLoading(true);
        const response = await axios.post('/user/create-profile', {
            name: login, 
            password
        });

        const {token, name, message, status} = await response.data;

        checkJwtExpired(message);

        if(token && name) {
            localStorage.setItem('token', token);
            setName(name);
        } else if(status === 0) alert(message.message);
        
        setIsLoading(false);
    }

    const changePass = async e => {
        e.preventDefault();

        setIsLoading(true);

        const response = await axios.post('/user/change-pass', {
            token: localStorage.getItem('token'), 
            name, 
            password: e.target.password.value
        });

        const {message, status} = await response.data;

        checkJwtExpired(message);

        alert(message);
        setIsLoading(false);
    }

    const logout = async () => {
        setIsLoading(true);

        const response = await axios.post('/user/logout', {
            token: localStorage.getItem('token'), 
            name
        });

        const {message, status} = await response.data;
        
        localStorage.removeItem('token');
        setName(null);
        setIsLoading(false);

        history.push('/user/login');
    }

    const checkJwtExpired = message => {
        if (message && message.message && ['Wrong token', 'jwt expired'].includes(message.message)) {
            logout();
            alert('You have to re-login');
        }
    }

    useEffect(() => {
        if (!/\/note\/note.*/.test(history.location.pathname)) {
            if (name && history.location.pathname === '/user/login') history.push('/');
            else if (!name) history.push('/user/login')
        }
    }, [name, history.location.pathname])

    useEffect(() => {
        localStorage.getItem('token')
        && 
        (async () => {
            setIsLoading(true);

            const response = await axios.post('/user/auth', {
                token: localStorage.getItem('token')
            });
    
            const {name, message, status} = await response.data;

            checkJwtExpired(message);

            if(name) setName(name);
            setIsLoading(false);
        })()
    }, [])

    return {
        name,
        isLoading,
        createProfile,
        login,
        changePass,
        logout,
        checkJwtExpired,
    }
}

export default useUser;