import { useEffect, useRef, useState } from 'react';
import './App.css';
import NoteItem from './Components/NoteItem';
import { PlusCircle, RefreshCcw, X, XOctagon } from 'react-feather';

function App() {
  const [notes, setNotes] = useState([]);
  const noteField = useRef(null);

  useEffect(()=> {
    getNotes();
  }, []);

  const getNotes = async () => {
    let response = await fetch(`http://localhost:7070/notes` , {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    let data = await response.json();
    setNotes(data);
  }

  const addNote = (e) => {
    e.preventDefault();
    (async () => {
      let response = await fetch(`http://localhost:7070/notes` , {
        body: JSON.stringify([noteField.current.value]),
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      });
      if (response.ok) {
        getNotes();
      }
    })();

      noteField.current.value = "";
  }
 
  return (
    <div className="App">
        <div className="wrapper-notes">
          <div className="title">
            <span>Notes</span>
            <button onClick={(e) => getNotes()}><RefreshCcw/></button>
          </div>
          
          <div className='notes-list'>
            {
              notes.map(
                item =>  <NoteItem text={item.content} key={item.id} id={item.id} getNotes={getNotes} notes={notes}/>
              )
            }
          </div>
          <form className="form-group">
              <label htmlFor="new-note" className='new-note-text'>New note</label>
              <textarea ref={noteField} name="new-note" rows="2" cols="10" id="new-note" placeholder='введите текст'></textarea>
              <button onClick={addNote}><PlusCircle /></button>
          </form>
        </div>
    </div>
  );
}

export default App;
