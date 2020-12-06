import { useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import useNote from "../hooks/useNote";
import useUser from "../hooks/useUser";
import { NoteContext, UserContext } from "../utils/context";
import ChangePass from "./ChangePass";
import InitialLayout from "./InitialLayout";
import Loading from "./Loading";
import Login from "./Login";
import Nav from "./Nav";
import Note from "./note/Note";
import NoteList from "./note/NoteList";

const App = () => {
  const user = useUser();
  const note = useNote(user);

  const isLoading = useMemo(
    () => {
      if(user.isLoading || note.isLoading) return true;
    }, 
    [
      user.isLoading, 
      note.isLoading
    ]
  )

  return (
    <UserContext.Provider value = {user}>
      <NoteContext.Provider value = {note}>
        <Switch>
          <Route exact path = '/' component = {InitialLayout} />
          <Route exact path = '/user/login' component = {Login} />
          <Route exact path = '/user/change-pass' component = {ChangePass} />
          <Route exact path = '/note/note:noteId' component = {Note} />
          <Route exact path = '/note/list' component = {NoteList} />
        </Switch>
        <Nav />
        <Loading isLoading = {isLoading} />
      </NoteContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
