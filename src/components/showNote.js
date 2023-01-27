import { useEffect, useState } from "react";

function ShowNotes() {
    let [notes,setNotes] = useState([]);

    useEffect(() => {
        let fetchData = async () => {
            // fetch the notes from server
            let fetchedNotes = await fetch("https://postgres-notebook.onrender.com/api/note",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (fetchedNotes.ok) {
                let fetchedNotesJson = await fetchedNotes.json();
                if (fetchedNotesJson) {
                    console.log(fetchedNotesJson);
                    setNotes(fetchedNotesJson.output);
                }
            } else {
                console.log("Error while getting the notes from server api");
            }
        }
        fetchData();
    },[]);

    return (
        <div id="show-notes">
            {
                notes && notes.length > 0 ? <h2>Here are your notes:</h2> : <h2>No Notes added Yet</h2>
            }
            {
                notes && notes.length > 0 ? notes.map((note,index) => {
                    return <SingleNote
                                key={note.noteid}
                                note={note}
                            />
                }) : null
            }
        </div>
    );
}

function SingleNote({note}) {

    const [isUpdateActive,setIsUpdateActive] = useState(false);
    const [newTitle,setNewTitle] = useState(note.title);
    const [newNote,setNewNote] = useState(note.note)

    const hanldeDeleteNote = async (e) => {
        let id = note.noteid;
        let deleteData = await fetch(`https://postgres-notebook.onrender.com/api/note/${id}`,{
            method: "DELETE",
        });
        if (deleteData.ok) {
            let deleteDataJson = await deleteData.json();
            console.log(deleteDataJson);
        } else {
            console.log("Error while deleting the note")
        }
    }

    const handleNewTitle = (e) => {
        setNewTitle(e.target.value);
    }

    const handleNewNote = (e) => {
        setNewNote(e.target.value);
    }

    const handleUpdateSubmit = async (e) => {
        try {
            e.preventDefault();
            let id = note.noteid;
            let resObj = {
                title: newTitle,
                note: newNote
            };
            let updateData = await fetch(`https://postgres-notebook.onrender.com/api/note/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(resObj)
            });
            if (updateData.ok) {
                let updateDataJson = await updateData.json();
                console.log(updateDataJson);
                setIsUpdateActive(false);
            } else {
                console.log("Error while updating the note");
            }
        } catch (err) {
            console.log(err);
            console.log("Error while updating notes");
        }
    }

    if (!isUpdateActive) {
        return (
            <div className="single-note">
                                                <h2 className="title">
                                                    {
                                                        note.title
                                                    }
                                                </h2>
                                                <p className="note">
                                                    {
                                                        note.note
                                                    }
                                                </p>
                                                <div>
                                                    <button className="update" id={note.noteid} onClick={() => setIsUpdateActive(true)}>Update</button>
                                                    <button className="delete" id={note.noteid} onClick={hanldeDeleteNote}>Delete</button>
                                                </div>
                                            </div>
        )
    }

    return (
        <div className="single-note">
            <form onSubmit={handleUpdateSubmit}>
                <label htmlFor="newTitle">New Title</label>
                <input type="text" id="newTitle" name="newTitle" placeholder="enter new Title" value={newTitle} onChange={handleNewTitle} required/>

                <label htmlFor="newNote">New Note</label>
                <textarea type="text" id="newNote" name="newNote" value={newNote} onChange={handleNewNote}  required ></textarea>

                <button type="submit" className="update" id={note.noteid}>Update</button>
                <button onClick={() => setIsUpdateActive(false)} className="cancel">Cancel</button>
            </form>
        </div>
    )
}

export default ShowNotes;