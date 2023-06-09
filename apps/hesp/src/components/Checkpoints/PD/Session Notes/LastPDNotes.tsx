import { useEffect, useState } from "react";
import { IPDCcheckpoint, SessiontNotes } from "../../../../../types"
import { v4 as uuidv4 } from 'uuid'

interface LastPDNotesProps {
  lastPDCheckpoint: IPDCcheckpoint
}

function LastPDNotes({ lastPDCheckpoint }: LastPDNotesProps) {

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
  }]);

  useEffect(() => {
    if (lastPDCheckpoint.SessionNotes) {
      const notes = lastPDCheckpoint.SessionNotes.map((note) => {
        return {
          id: note.id,
          edit: note.edit,
          saved: note.saved,
          topic: note.topic,
          objective: note.objective,
          actions: note.actions,
          notes: note.notes,
          results: note.results,
          evaluation: note.evaluation
        };
      });
      setSessionNotes(notes);
    }
  }, [lastPDCheckpoint]);


  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Session Notes
        </h3>
      </div>
      {sessionNotes.map((note) =>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 xl:grid-cols-6">
              <dt className="text-sm font-medium text-gray-500">
                Topic
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {note.topic}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Objective
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {note.objective}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Actions
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {note.actions}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Notes
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {note.notes}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Results
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {note.results}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Evaluation
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {note.evaluation}
              </dd>
            </div>
          </dl>
        </div>)}
    </div>


    // <div className="space-y-10 pl-5 pr-5 pb-10" >
    //   <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
    //     <div className="min-w-0 flex-1 pb-8">
    //       <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Session Notes</h3>
    //     </div>
    //     <div className="mt-5 flex lg:ml-4 lg:mt-0">
    //       <span className="sm:ml-3">
    //       </span>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">

    //     <div className="col-span-2 ">
    //       {sessionNotes.map((note) =>
    //       (<div key={note.id} className="grid justify-self-end bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl  mb-5">
    //         <div className="px-4 py-6 sm:p-8">
    //           <div className="">
    //             <div className="">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">
    //                 Topic
    //               </label>
    //               <div className="">
    //                 <label htmlFor="topic">
    //                   <div
    //                     id="topic"
    //                     className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   > {note.topic} </div>
    //                 </label>
    //               </div>
    //             </div>
    //             <div className="">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">
    //                 Objective               </label>
    //               <div className="">
    //                 <label htmlFor="objective" >
    //                   <div
    //                     id="objective"
    //                     className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   >
    //                     {note.objective} </div>
    //                 </label>
    //               </div>
    //             </div>
    //             <div className="">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">
    //                 Actions
    //               </label>
    //               <div className="">
    //                 <label htmlFor="actions">
    //                   <div
    //                     id="actions"
    //                     className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   >
    //                     {note.actions}</div>
    //                 </label>
    //               </div>
    //             </div>  <div className="">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">
    //                 Notes
    //               </label>
    //               <div className="">
    //                 <label htmlFor="notes">
    //                   <div
    //                     id="notes"
    //                     className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   >
    //                     {note.notes}</div>
    //                 </label>
    //               </div>
    //             </div>
    //             <div className="">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">
    //                 Results
    //               </label>
    //               <div className="">
    //                 <label
    //                   htmlFor="results">
    //                   <div
    //                     id="results"
    //                     className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   >
    //                     {note.results}</div>
    //                 </label>
    //               </div>
    //             </div>
    //             <div className="">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">
    //                 Evaluation
    //               </label>
    //               <div className="">
    //                 <label htmlFor="evaluation">
    //                   <div
    //                     id="evaluation"
    //                     className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   >
    //                     {note.evaluation}</div>
    //                 </label>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="flex items-center gap-x-6 border-gray-900/10  py-4  ">
    //           </div>
    //         </div>
    //       </div>)

    //       )}
    //     </div>
    //   </div>
    // </div >
  )
}

export default LastPDNotes