import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useNote = (user) => {
    const [noteList, setNoteList] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [isNew, setIsNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const refreshNote = () => {
        setTitle('');
        setContent('');
        setIsNew(false);
    }

    const getNote = async () => {
        setIsLoading(true);
        const noteId = history.location.pathname.match(/\/note\/note_(.*)/);
        if(!noteId) {
            setIsLoading(false);
            return;
        }

        const response = await axios.get('/note/get-note', {
                headers: {note: noteId[1]}
        });

        const {noteData, message, status} = await response.data;
    
        user.checkJwtExpired(message);

        if(status === 0) alert(message.message);
        if(noteData) {
            setTitle(noteData.title);
            setContent(noteData.content);
        }
        
        setIsLoading(false);
    }

    const createNote = async () => {
        setIsLoading(true);
        const response = await axios.post('/note/note-create', {
            token: localStorage.getItem('token'),
            name: user.name,
            title,
            content
        });

        const {list, message, status} = await response.data;

        user.checkJwtExpired(message);

        if(status === 0) alert(message.message);
        if(list) setNoteList(list);

        refreshNote();
        setIsLoading(false);
        history.push('/');
    }

    const updateNote = async () => {
        setIsLoading(true);
        const response = await axios.post('/note/note-update', {
            token: localStorage.getItem('token'),
            name: user.name,
            noteId: history.location.pathname.match(/\/note\/note_(.*)/)[1],
            title,
            content
        });

        const {list, message, status} = await response.data;

        user.checkJwtExpired(message);

        if(status === 0) alert(message.message);
        if(list) setNoteList(list);

        refreshNote();
        setIsLoading(false);
        history.push('/note/list');
    }

    const deleteNote = async (title, noteId) => {
        const isAgree = window.confirm(`Do you really want to delete note ${title}?`)
        if(!isAgree) return;

        setIsLoading(true);
        const response = await axios.post('/note/note-delete', {
            token: localStorage.getItem('token'),
            name: user.name,
            noteId
        });

        const {list, message, status} = await response.data;

        user.checkJwtExpired(message);

        if(status === 0) alert(message.message);
        if(list) setNoteList(list);

        refreshNote();
        setIsLoading(false);
    }

    const selectNote = id => {
        const note = noteList.find(row => row.id === id);

        setTitle(note.title);
        setContent(note.content);
    }

    useEffect(() => {
        if (/\/note\/note.*/.test(history.location.pathname) && !user.name) getNote();
        else if (!/\/note\/note.*/.test(history.location.pathname)) refreshNote();
    }, [history.location.pathname])

    useEffect(() => {
        history.location.pathname === '/note/list'
        &&
        (async () => {
            setIsLoading(true);
            const response = await axios.post('/note/get-list', {
                token: localStorage.getItem('token'),
                name: user.name
            });
    
            const {list, message, status} = await response.data;

            user.checkJwtExpired(message);
            if(status === 0) alert(message.message);
            if(list) setNoteList(list);
            
            setIsLoading(false);
        })()
    }, [history.location.pathname])

    return {
        noteList,
        setNoteList,
        title,
        setTitle,
        content,
        setContent,
        isNew,
        setIsNew,
        isLoading,
        selectNote,
        createNote,
        updateNote,
        deleteNote
    }
}

export default useNote;