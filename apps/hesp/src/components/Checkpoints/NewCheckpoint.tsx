import Navbar from "../Navbar";
import { useEffect, useState } from 'react';
import PDForm from './PD/PDform';
import WOLForm from './WOL/WOLform';
import SessionNotes from "./PD/Session Notes/SessionNotes";
import { useRouter } from "next/router";
import { Ratings, WOLTopics, NewCheckpointProps, SessiontNotes } from "../../../types";
import Link from "next/link";




function NewCheckpoint({ person, id, lastPDCheckpoint, lastWOLCheckpoint }: NewCheckpointProps) {
  const router = useRouter()

  const [pd, setPD] = useState(false)
  const [sessionNotes, setSessionNotes] = useState<SessiontNotes>([]);
  const [ratings, setRatings] = useState<Ratings>([]);
  const [WOLdata, setWOLdata] = useState<WOLTopics>([]);
  const [PDSaved, setPDSaved] = useState(false)
  const [WOLSaved, setWOLSaved] = useState(false)
  const [isPDFormValid, setIsPDFormValid] = useState(false)

  // to check that all the fields are fille
  useEffect(() => {
    setIsPDFormValid(ratings.every((rating) => rating.value !== 0));
  }, [ratings]);
  // do the same for WOL
  // ....
  // ........






  // WOL 

  const handleWOLDataChange = (data: WOLTopics) => {
    setWOLdata(data)
  }

  function handleSubmitWol(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const data = WOLdata.map(topic => ({
      [topic.body]: topic.value,
      [`${topic.body}Feel`]: topic.feel,
      [`${topic.body}Improve`]: topic.improve,
    }));

    const params = new URLSearchParams();
    params.append('userId', id.toString());


    data.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
    });
    fetch("/api/wol/createWOL", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => {
      if (response.ok) {
        window.alert("WOL checkpoint is added");
      } else {
        window.alert("Checkpoint can't be submitted")
      }
      setWOLSaved(!WOLSaved)
      // window.location.reload()   
      router.push(`/candidates/${id}/checkpoint`)

    });
  }




  //PD topics 
  const handleSessionNotesChange = (notes: SessiontNotes) => {
    setSessionNotes(notes);
  };

  const handleRatingChange = (ratings: Ratings) => {
    setRatings(ratings);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (isPDFormValid) {

      const params = new URLSearchParams();

      params.append('userId', id.toString());

      ratings.forEach((rating) => {
        params.append(rating.body, rating.value.toString());
      });
      const sessionNotesString = JSON.stringify(sessionNotes);
      params.append('sessionNotes', sessionNotesString);



      fetch("/api/pdc/createPD", {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",

        },
      }).then((response) => {
        if (response.ok) {
          window.alert("Checkpoint added");
        } else {
          window.alert("Checkpoint can't be submitted")
        }
      });
      setPDSaved(!PDSaved)
      router.push(`/candidates/${id}/checkpoint`)
    } else {
      window.alert('Please answer all the questions to submit the form')
    }
  }

  return (
    <div>
      <Navbar headerText={"HESP Program"}></Navbar>

      <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10 ">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                <a href={`/candidates/${id}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{person.firstName + " " + person.lastName} </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">New Checkpoint
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {pd ? (
        <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              New Professional Development Checkpoint
            </h3>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="hidden sm:block">
              <button
                onClick={() => {
                  setPD(!pd);
                }}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <svg
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                Switch to WOL
              </button>
            </span>
            {lastPDCheckpoint ? <></> :
              <span className="sm:ml-3">
                <button
                  data-cy='pd-button'
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Save
                </button>
              </span>}
          </div>
        </div>
      ) :
        <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              New WOL Checkpoint
            </h3>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="hidden sm:block">
              <button
                onClick={() => {
                  setPD(!pd);
                }}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <svg
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                Switch to Professional Development
              </button>
            </span>
            {lastWOLCheckpoint ? <></> :
              <span className="sm:ml-3">
                <button
                  data-cy='wol-button'
                  onClick={(event) => {
                    handleSubmitWol(event);
                  }}
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Save
                </button>
              </span>}
          </div>
        </div>
      }

      {
        pd ? <>
          <PDForm PDSaved={PDSaved} lastPDCheckpoint={lastPDCheckpoint} onRatingChange={handleRatingChange} />
          <SessionNotes PDSaved={PDSaved} lastPDCheckpoint={lastPDCheckpoint} onSessionNotesChange={handleSessionNotesChange} ></SessionNotes>
        </>
          : <WOLForm lastWOLCheckpoint={lastWOLCheckpoint} WOLSaved={WOLSaved} onDataChange={handleWOLDataChange}></WOLForm>

      }
    </div >
  )

}

export default NewCheckpoint;
