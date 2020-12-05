import React, { useContext, useState, useEffect, useMemo } from 'react';
import { UserContext } from '../utils/context';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(UserContext);

    const createProfile = () => user.createProfile(name, password);
    const login = () => user.login(name, password);

    return (
        <div className = 'login'>
            <div className = 'login-form'>
                <h1>Log In</h1>
                <form>
                    <label>
                        <h2>Username:</h2>
                        <input type = "text" value = {name} onChange = {e => setName(e.target.value)} minLength = "3" maxLength = "15" required />
                    </label>
                    <label>
                        <h2>Pass:</h2>
                        <input type = "password" value = {password} onChange = {e => setPassword(e.target.value)} minLength = "6" maxLength = "15" required />
                    </label>
                    <input type = "button" value = "Create profile" onClick = {createProfile}/>
                    <input type = "button" value = "Enter" onClick = {login}/>
                </form>
            </div>
        </div>
    )
}

export default Login;