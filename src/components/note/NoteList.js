import React, { useContext, useMemo, useEffect } from 'react';
import { NoteContext, UserContext } from '../../utils/context';
import { Link } from 'react-router-dom';
import getTwoDigit from '../../utils/get-two-digit';

const NoteList = () => {
    const user = useContext(UserContext);
    const note = useContext(NoteContext);

    const list = useMemo(() => {
        return note.noteList.map(row => {
            const createdDate = new Date(row.created);
            const updatedDate = row.updated ? new Date(row.updated) : createdDate;

            const created = 
                'Created: ' +
                `${getTwoDigit(createdDate.getDate())}.` +
                `${getTwoDigit(createdDate.getMonth() + 1)} ` +
                `${getTwoDigit(createdDate.getHours())}:` +
                `${getTwoDigit(createdDate.getMinutes())}`

            const updated = 
                'Updated: ' +
                `${getTwoDigit(updatedDate.getDate())}.` +
                `${getTwoDigit(updatedDate.getMonth() + 1)} ` +
                `${getTwoDigit(updatedDate.getHours())}:` +
                `${getTwoDigit(updatedDate.getMinutes())}`

            return (
                <div className = 'note-container' key = {row.id}>
                    <span>{row.title} </span>
                    <span>{created} </span>
                    <span>{updated} </span>
                    <div>
                        <Link to = {`/note/note_${row.id}`} onClick = {() => note.selectNote(row.id)}>
                            &#9776;
                        </Link>
                        <input type = 'button' className = 'note-list-input' value = '&#10008;' onClick = {() => note.deleteNote(row.title, row.id)} />
                    </div>

                </div>
            )
        })       
    }, [note.noteList])

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className = 'container-1'>
            <div className = 'container-2'>
                {list}
            </div>
        </div>
    )
}

export default NoteList;