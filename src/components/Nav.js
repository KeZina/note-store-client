import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NoteContext, UserContext } from '../utils/context';

const Nav = () => {
    const user = useContext(UserContext);
    const note = useContext(NoteContext);

    return (
        <nav>
            {
                user.name
                &&
                <>
                    <div className = 'nav-container'>
                        <Link className = 'nav-link' to = '/'>Home</Link>
                        <Link className = 'nav-link' to = '/note/list'>Note List</Link>
                        <Link className = 'nav-link' to = '/note/note-create' onClick = {() => note.setIsNew(true)}>Create Note</Link>
                    </div>
                    <div className = 'nav-container'> 
                        <span className = 'nav-link' onClick = {user.logout}>Logout</span>
                        <Link className = 'nav-link' to = '/user/change-pass'>Change Password</Link>
                    </div>
                </>
            }
        </nav>
    )
}

export default Nav;