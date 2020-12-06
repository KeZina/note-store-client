import React, { useContext, useState } from 'react';
import { UserContext } from '../utils/context';

const ChangePass = () => {
    const [password, setPassword] = useState('');
    const user = useContext(UserContext);

    const changePass = () => user.changePass(password);

    return (
        <div className = 'change-pass'>
            <div className = 'change-pass-form'>
                <form>
                    <label>
                        <h2>Password:</h2>
                        <input type = "password" value = {password} onChange = {e => setPassword(e.target.value)} minLength = "6" maxLength = "15" required />
                    </label>
                    <input type = "button" value = "Change Password" onClick = {changePass}/>
                </form>
            </div>
        </div>
    )
}

export default ChangePass;