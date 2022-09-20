import React from 'react';
import PropTypes from 'prop-types';
import '../css/Note.css';

import {setValue} from '../utility/MyFirebase';

function Note(props) {
    
    //We are going to create state variables in 
    //a special way because we want React to
    //track when those variables change..so it knows when to
    //update the webpage.

    //Right now notes is getting its "content" from
    //properties..........
    let [title, setTitle] = React.useState(props.title);
    let [body, setBody] = React.useState(props.body);
    let [editMode, setEditMode] = React.useState(false);

    let titleContent = React.createRef();
    let bodyContent = React.createRef();

    function handleEdit() {
        setEditMode(true);
    }

    function handleSave() {
        //Update database
        setValue(props.id, {
            title: titleContent.current.value,
            body: bodyContent.current.value
        });

        //Update state
        setTitle(titleContent.current.value);
        setBody(bodyContent.current.value);

        //End edit mode
        setEditMode(false);
    }

    function handleDelete() {
        props.deleteHandler(props.id);
    }

    let titleElement, bodyElement, buttonArea;
    if (editMode) {
        titleElement = <textarea ref={titleContent} className="title-textarea" defaultValue={title}></textarea>;
        bodyElement = <textarea ref={bodyContent} className="body-textarea" defaultValue={body}></textarea>;
        buttonArea = <div><button className="btn btn-primary" onClick={handleSave}>Save</button></div>;
    } else {
        titleElement = <h5 className="card-title">{title}</h5>;
        bodyElement = <p>{body}</p>;
        buttonArea = (
            <div>
                <button className="btn btn-info" onClick={handleEdit}>Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        );
    }

    return (
        <div className="col-sm-6">
            <div className="card card-view">
                <div className="card-body">
                    {titleElement}
                    {bodyElement}
                    {buttonArea}
                </div>
            </div>
        </div>
    );
}

export default Note;