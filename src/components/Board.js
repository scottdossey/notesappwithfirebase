import React from 'react';
import Note from './Note';
import '../css/Board.css';
import {getRoot, pushValue, removeValue} from '../utility/MyFirebase';

const GENERIC_NOTE_TITLE = "New Note Title";
const GENERIC_NOTE_BODY = "New Note Body";

function Board() {
    
    let [notes, setNotes] = React.useState([]);


    function addNote() {
        //Create new database entry with random key name
        let pushReference = pushValue( {
            title: GENERIC_NOTE_TITLE,
            body: GENERIC_NOTE_BODY
        });
        
        //Create memory entry
        let new_notes = [...notes];
        new_notes.push(
            {
                id: pushReference.key,  //set id to the database
                                        //key we used.
                title: GENERIC_NOTE_TITLE,
                body: GENERIC_NOTE_BODY
            }
        );
        setNotes(new_notes);
    }

    function replaceNotes(notes) {
        let new_notes = [];
        for(let key in notes) {
            new_notes.push(
                {
                    id: key,
                    title: notes[key].title,
                    body: notes[key].body
                }
            );
        }
        setNotes(new_notes);
    }

    React.useEffect(()=>{
        getRoot().then((snapshot) => {
            replaceNotes(snapshot.val());
        });
    }, []);


    function deleteNote(id) {
        //Delete note from memory array
        let newNotes = [];
        for( let note of notes ) {
            if( id !== note.id) {
                newNotes.push(note);
            }
        }

        //Delete note from database
        removeValue(id);

        //Update state
        setNotes(newNotes);
    }
    
    getRoot().then((snapshot) => {
        console.log(snapshot.val());
    });

    return (
        <div>
            <div className="div-board">
                <div className="row"> 
                    {notes.map( note => <Note key={note.id} id={note.id} title={note.title} body={note.body} deleteHandler={deleteNote} /> )}
                </div>
            </div>
            <div>
                <button className="btn btn-success add-button" onClick={addNote}>Add</button>
            </div>
        </div>
    );
}

export default Board;