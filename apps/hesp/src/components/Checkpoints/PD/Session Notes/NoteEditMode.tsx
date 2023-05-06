import React from 'react'
import { SessionNote } from '../../../../../types'

interface NoteEditModeProps {
  note: SessionNote;
  handleInputChange: (event: any, noteToChange: SessionNote) => void;
  handleSaveNote: (noteToSave: SessionNote, event: any) => void;
}


const NoteEditMode: React.FC<NoteEditModeProps> = ({
  note, handleInputChange, handleSaveNote
}) => {
  return (
    <form onSubmit={(event) => handleSaveNote(note, event)} className="mb-5 grid justify-self-end bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      <div className="px-4 py-4 sm:p-8">
        <div className="">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Topic
          </label>
          <div className=" ">
            <label htmlFor="topic">
              <textarea
                id="topic"
                name="topic"
                rows={1}
                className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={note.topic}
                onChange={(event) => handleInputChange(event, note)}
              />
            </label>
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Objective               </label>
          <div className="">
            <label htmlFor="objective" >
              <textarea
                id="objective"
                name="objective"
                rows={1}
                className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={note.objective}
                onChange={(event) => handleInputChange(event, note)}
              />
            </label>
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Actions
          </label>
          <div className="">
            <label htmlFor="actions">
              <textarea
                id="actions"
                name="actions"
                rows={3}
                className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={note.actions}
                onChange={(event) => handleInputChange(event, note)}
              />
            </label>
          </div>
        </div>  <div className="">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Notes
          </label>
          <div className="">
            <label htmlFor="notes">
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={note.notes}
                onChange={(event) => handleInputChange(event, note)}
              />
            </label>
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Results
          </label>
          <div className="">
            <label htmlFor="results">
              <textarea
                id="results"
                name="results"
                rows={3}
                className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={note.results}
                onChange={(event) => handleInputChange(event, note)}
              />
            </label>
          </div>
          <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Evaluation
            </label>
            <div className="">
              <label htmlFor="evaluation">
                <textarea
                  id="evaluation"
                  name="evaluation"
                  rows={3}
                  className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={note.evaluation}
                  onChange={(event) => handleInputChange(event, note)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-x-6 border-gray-900/10 py-4  ">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"  >
            Save Topic
          </button>
        </div>  </div>
    </form>
  )
}

export default NoteEditMode