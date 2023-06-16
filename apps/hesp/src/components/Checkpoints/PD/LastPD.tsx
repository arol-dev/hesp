import { ReactNode, useEffect, useState } from "react";
import { IPDCcheckpoint, SessiontNotes } from "../../../../types"
import moment from "moment";
import { v4 as uuidv4 } from 'uuid'

interface LastPDProps {
  lastPDCheckpoint: IPDCcheckpoint
  children: ReactNode;
}

function LastPD({ lastPDCheckpoint }: LastPDProps) {

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

  const [ratings, setRatings] = useState([
    {
      name: "Trust",
      body: "trust",
      description: "The trainee trust in the established action plan",
      value: lastPDCheckpoint.trust,
    },
    {
      name: "Follow",
      body: "willFollow",
      description: "He will follow the action plan",
      value: lastPDCheckpoint.willFollow,
    },
    {
      name: "Task retention",
      body: "retention",
      description: "He will remember what he should do",
      value: lastPDCheckpoint.readyForInterviews,
    },
    {
      name: "Plan commitment",
      body: "commitment",
      description: "He is committed with the formation",
      value: lastPDCheckpoint.commitment,
    },
    {
      name: "CV",
      body: "cv",
      description: "His CV (resume) is done",
      value: lastPDCheckpoint.cv,
    },
    {
      name: "Interviews",
      body: "readyForInterviews",
      description: "He is ready to job interviews",
      value: lastPDCheckpoint.readyForInterviews,
    },
    {
      name: "Advancement",
      body: "advancement",
      description: "He is advancing well",
      value: lastPDCheckpoint.advancement,
    },
  ]);


  const lastCheckpointDate = lastPDCheckpoint?.createdAt
  const dateToShow = moment(lastCheckpointDate).format('ll');



  return (
    <div className="pl-5 pr-5">
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Last WOL checkpoint
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {dateToShow}
            </p>
          </div>
          {ratings.map((rating, index) => (
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 xl:grid-cols-4">
                  <dt className="text-sm font-medium  text-gray-500">
                    {rating.name}
                  </dt>
                  <div> {rating.description}</div>
                  <dd className="mt-1 text-sm text-gray-900  sm:mt-0">
                    <div className="flex items-center">
                      <div className="h-2 rounded-full bg-gray-300 w-40">
                        <div
                          className={` h-full rounded-full ${rating.value >= 7
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : rating.value >= 4
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-red-400 to-red-600"
                            }`}
                          style={{ width: `${(rating.value / 9) * 100}%` }}
                        >
                        </div>
                      </div>
                      <div className="ml-5">
                        {rating.value}
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          ))}
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
      </div>
    </div>



    // <div>
    //   {ratings.map((rating, index) => (
    //     <div
    //       data-cy="last-pd-card"
    //       key={index}
    //       className="space-y-10 divide-y divide-gray-900/10 pl-5 pr-5 pb-10"
    //     >
    //       <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
    //         <div className="px-4 sm:px-0">
    //           <h2 className="text-base font-semibold leading-7 text-gray-900">
    //             {rating.name}
    //           </h2>
    //           <p className="mt-1 text-sm leading-6 text-gray-600 pb-4">
    //             {rating.description}{" "}
    //           </p>
    //           <div className="h-2 rounded-full bg-gray-300 w-1/2">
    //             <div
    //               className={`h-full rounded-full ${rating.value >= 4
    //                 ? "bg-gradient-to-r from-green-400 to-green-600"
    //                 : rating.value >= 3
    //                   ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
    //                   : "bg-gradient-to-r from-red-400 to-red-600 "
    //                 }`}
    //               style={{ width: `${(rating.value / 5) * 100}%` }}
    //             ></div>
    //           </div>
    //         </div>
    //         <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
    //           <div className="px-4 py-6 sm:p-8">
    //             <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //               <div className="sm:col-span-4">
    //                 <label className="block text-sm font-medium leading-6 text-gray-900">
    //                   Satisfaction level
    //                 </label>
    //                 <div className="mt-2">
    //                   <div className="flex rounded-md  focus-within:ring-indigo-600 sm:max-w-md">
    //                     <div className="flex items-center space-x-2">
    //                       {[1, 2, 3, 4, 5].map((number) => (
    //                         <label
    //                           htmlFor={`${rating.name}-${number}`}
    //                           key={`${index}-${number}`}
    //                         >
    //                           <input
    //                             disabled={true}
    //                             type="checkbox"
    //                             name={`${rating.name}`}
    //                             id={`${rating.name}-${number}`}
    //                             value={rating.value}
    //                             checked={rating.value === number}
    //                             className="hidden"
    //                           />
    //                           <span
    //                             data-cy="last-rating"
    //                             className={`${rating.value === number
    //                               ? "bg-blue-500 text-white"
    //                               : "bg-white text-gray-900"
    //                               } inline-flex items-center justify-center rounded-md px-3 py-1.5 border border-gray-300 shadow-sm pointer-events-none`}
    //                           >
    //                             {number}
    //                           </span>
    //                         </label>
    //                       ))}
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   ))}
    // </div >
  )
}
export default LastPD