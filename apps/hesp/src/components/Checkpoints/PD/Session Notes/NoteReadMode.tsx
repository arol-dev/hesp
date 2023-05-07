import React from "react"
import { SessionNote } from "../../../../../types"

interface NoteReadModeProps {
  note: SessionNote;
  handleEditNote: (noteToEdit: SessionNote) => void;
}

const NoteReadMode: React.FC<NoteReadModeProps> = ({
  note, handleEditNote
}) => {
  return (
    <div className="grid justify-self-end bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl  mb-5">
      <div className="px-4 py-6 sm:p-8">
        <div className="">
          <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Topic
            </label>
            <div className="">
              <label htmlFor="topic">
                <div
                  id="topic"
                  className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                > {note.topic} </div>
              </label>
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Objective               </label>
            <div className="">
              <label htmlFor="objective" >
                <div
                  id="objective"
                  className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {note.objective} </div>
              </label>
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Actions
            </label>
            <div className="">
              <label htmlFor="actions">
                <div
                  id="actions"
                  className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {note.actions}</div>
              </label>
            </div>
          </div>  <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Notes
            </label>
            <div className="">
              <label htmlFor="notes">
                <div
                  id="notes"
                  className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {note.notes}</div>
              </label>
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Results
            </label>
            <div className="">
              <label
                htmlFor="results">
                <div
                  id="results"
                  className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {note.results}</div>
              </label>
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Evaluation
            </label>
            <div className="">
              <label htmlFor="evaluation">
                <div
                  id="evaluation"
                  className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {note.evaluation}</div>
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-6 border-gray-900/10  py-4  ">
          <button
            onClick={() => handleEditNote(note)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
export default NoteReadMode