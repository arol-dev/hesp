import Navbar from "../Navbar";
import { useEffect, useState } from 'react';
import PDForm from './PD/PDform';
import WOLForm from './WOL/WOLform';
import SessionNotes from "./PD/Session Notes/SessionNotes";
import { useRouter } from "next/router";
import { Ratings, WOLTopics, NewCheckpointProps, SessiontNotes } from "../../../types";
import { parse } from "path";



function NewCheckpoint({ id }: NewCheckpointProps) {
  const router = useRouter()

  const [pd, setPD] = useState(false)
  const [sessionNotes, setSessionNotes] = useState<SessiontNotes>([]);
  const [ratings, setRatings] = useState<Ratings>([]);
  const [WOLdata, setWOLdata] = useState<WOLTopics>([]);
  const [PDSaved, setPDSaved] = useState(false)
  const [WOLSaved, setWOLSaved] = useState(false)

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

    fetch("/api/monthValidator", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
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
          // router.push(`/candidates/${id}`)
        })
      } else {
        window.alert(`A checkpoint was already created for this trainee within the last month.`)
      }
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

    const params = new URLSearchParams();

    params.append('userId', id.toString());

    ratings.forEach((rating) => {
      params.append(rating.body, rating.value.toString());
    });
    const sessionNotesString = JSON.stringify(sessionNotes);
    params.append('sessionNotes', sessionNotesString);


    fetch("/api/checkpointValidator", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {


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
        // router.push(`/candidates/${id}`)
      } else {
        window.alert(`A checkpoint was already created for this trainee within the last month.`)
      }
    });
  }

  return (
    <div>
      <Navbar headerText={"HESP Program"}></Navbar>
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
            <span className="sm:ml-3">
              <button
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
            </span>
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
            <span className="sm:ml-3">
              <button
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
            </span>
          </div>
        </div>
      }

      {
        pd ? <>
          <PDForm PDSaved={PDSaved} onRatingChange={handleRatingChange} />
          <SessionNotes PDSaved={PDSaved} onSessionNotesChange={handleSessionNotesChange} ></SessionNotes>
        </>
          : <WOLForm WOLSaved={WOLSaved} onDataChange={handleWOLDataChange}></WOLForm>

      }
    </div >
  )

}

export default NewCheckpoint;
