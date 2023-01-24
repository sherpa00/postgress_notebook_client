import { useState } from "react"

function AddNote() {
    const [isAddActive,setIsAddActive] = useState(false);

    function handleSetAddActive() {
        setIsAddActive(!isAddActive);
    };

    return (
        <div id="add-note-container">
            <h2>
                Add Note Here
            </h2>
            <br></br>
            {
                isAddActive ? <AddForm /> : <button onClick={handleSetAddActive}>Let's add note</button>
            }
        </div>
    )
}

function AddForm() {

    const [isLoading,setIsLoading] = useState(false);
    const [title,setTitle] = useState('');
    const [note,setNote] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        let noteItem = {
            title: title,
            note: note
        }
        // fetch to add note
        let fetchedData = await fetch('https://postgres-notebook.onrender.com/api/note',{
            method: "POST",
            headers: {
                'Content-Type': "Application/json"
            },
            body: JSON.stringify(noteItem)
        });

        if (fetchedData.ok) {
            setIsLoading(false);
            let fetchedDataJson = await fetchedData.json();
            console.log(fetchedDataJson);
            setNote('');
            setTitle('');

        } else {
            console.log("Error while fetching post data");
            setIsLoading(false);
        }
    }

    return (
        <form id="add-note" onSubmit={handleSubmit}>
            <label htmlFor="title">
                Note Title
            </label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} required placeholder="Note Title here" />
            <label htmlFor="title">
                Note Paragraph
            </label>
            <textarea type="text" id="note" value={note} onChange={handleNoteChange} required placeholder="Note here">

            </textarea>
            <button type="submit">
                {
                    isLoading ? "Loading..." : "Add Note"
                }
            </button>
        </form>
    )
}

export default AddNote;