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

    const hanldeDeleteNote = async (e) => {
        let id = e.target.id;
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
                <button className="update" id={note.noteid}>Update</button>
                <button className="delete" id={note.noteid} onClick={hanldeDeleteNote}>Delete</button>
            </div>
        </div>
    )
}

export default ShowNotes;