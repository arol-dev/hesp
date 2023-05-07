import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { SessionNote, SessiontNotes, SessionNotesProps } from "../../../../../types";
import NoteEditMode from "./NoteEditMode";
import NoteReadMode from "./NoteReadMode";


function SessionNotes({ onSessionNotesChange, PDSaved }: SessionNotesProps) {

  const [sessionNotes, setSessionNotes] = useState<SessiontNotes>([{
    id: uuidv4(),
    edit: true,
    saved: false,
    topic: "",
    objective: "",
    actions: "",
    notes: "",
    results: "",
    evaluation: ""
  }])

  useEffect(() => {
    onSessionNotesChange(sessionNotes);
  }, [sessionNotes, onSessionNotesChange]);


  const addNote = () => {
    let last = sessionNotes.length - 1
    if (!sessionNotes[last].saved) {
      window.alert("Please save the previous topic before adding a new one")
    }
    else {
      window.alert("New note was created!")
      const newNote = {
        id: uuidv4(),
        edit: true,
        saved: false,
        topic: "",
        objective: "",
        actions: "",
        notes: "",
        results: "",
        evaluation: ""
      }
      setSessionNotes([...sessionNotes, newNote])
    }
  }


  const handleInputChange = (event: any, noteToChange: SessionNote) => {
    setSessionNotes((prevsessionNotes) =>
      prevsessionNotes.map((note) => {
        if (note.id === noteToChange.id) {
          return {
            ...note,
            [event.target.name]: event.target.value,
          };
        }
        return note;
      })
    );
  };

  const handleSaveNote = async (noteToSave: SessionNote, event: any) => {
    event.preventDefault();
    const updatedsessionNotes = sessionNotes.map((note) => {
      if (note.id === noteToSave.id) {
        return {
          ...note,
          edit: !noteToSave.edit,
          saved: !noteToSave.saved,
          topic: noteToSave.topic,
          objective: noteToSave.objective,
          actions: noteToSave.actions,
          notes: noteToSave.notes,
          results: noteToSave.results,
          evaluation: noteToSave.evaluation
        };
      }
      return noteToSave;
    });
    setSessionNotes(updatedsessionNotes)
  }


  const handleEditNote = async (noteToEdit: SessionNote) => {
    const updatedsessionNotes = sessionNotes.map((note) => {
      if (note.id === noteToEdit.id) {
        return {
          ...note,
          edit: !noteToEdit.edit,
          saved: !noteToEdit.saved
        };
      }
      return note;
    });
    setSessionNotes(updatedsessionNotes)

  }
  return (
    <div className="space-y-10 pl-5 pr-5 pb-10">
      <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
        <div className="min-w-0 flex-1 pb-8">
          <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Session Notes</h3>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <button disabled={PDSaved} onClick={addNote} type="submit" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              + Add Topic
            </button>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0 col-span-1">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Topics</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="col-span-2 ">
          {sessionNotes.map((note) =>
            note.edit === true ?
              (<NoteEditMode note={note} handleInputChange={handleInputChange} handleSaveNote={handleSaveNote} PDSaved={PDSaved} />) :
              (<NoteReadMode note={note} handleEditNote={handleEditNote} />)
          )}
        </div>
      </div>
    </div >
  )
}

export default SessionNotes