import React, { useContext, useEffect, useMemo } from 'react';
import { NoteContext, UserContext } from '../../utils/context';

const Note = () => {
    const user = useContext(UserContext);
    const note = useContext(NoteContext);

    useEffect(() => window.scrollTo(0, 0), [])

    const noteButton = useMemo(() => {
        if(!user.name) {
            return null;
        } else if(note.isNew) {
            console.log(note)
            return <input type = "button" value = "Create note" onClick = {note.createNote}/>
        } else if(!note.isNew) {
            return <input type = "button" value = "Apply changes" onClick = {note.updateNote}/>
        }
    }, [note, user.name])

    return (
        <div className = 'container-1'>
            <div className = 'container-2'>
                <form className = 'note-form'>
                    <label>
                        <h2>Title:</h2>
                        <input type = "text" value = {note.title} onChange = {e => note.setTitle(e.target.value)} minLength = "5" maxLength = "25" required />
                    </label>
                    <label>
                        <h2>Content:</h2>
                        <textarea value = {note.content} onChange = {e => note.setContent(e.target.value)} />
                    </label>
                    {noteButton}
                </form>
            </div>
        </div>
    )
}

export default Note;