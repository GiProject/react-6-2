import React from "react";
import { X } from "react-feather";

export default function NoteItem({text, getNotes, id}) {
      
    const deleteNote = async () => {
        let response = await fetch(`http://localhost:7070/notes/${id}` , {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            getNotes()
        }
    }

    return <div className="note">
        <p>{text}</p>
        <button onClick={deleteNote}><X /></button>
    </div>
}