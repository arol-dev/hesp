
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Navbar from "./Navbar";
import { useState } from 'react';
import PDForm from './PDform';
import WOLForm from './WOLform';


function Checkpoint() {
  const [pd, setPD] = useState(false)
  const [clicked, setClicked] = useState(0)
  const [progress, setProgress] = useState(0)




  const [ratings, setRatings] = useState([
    { name: "Trust", value: 0 },
    { name: "Quality", value: 0 },
    { name: "Communication", value: 0 },
    // Add more rating bars here
  ]);




  function handleRatingChange(index, value) {
    const updatedRatings = [...ratings];
    updatedRatings[index].value = value;
    setRatings(updatedRatings);
  }



  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("buttons is clicked", ratings);

    // Convert ratings array into URLSearchParams object
    const params = new URLSearchParams();
    ratings.forEach((rating) => {
      params.append(rating.name, rating.value.toString());
    });

    // POST request to your API endpoint
    fetch("/api/form-PD", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => {
      if (response.ok) {
        // handle success
      } else {
        // handle error
      }
    });
  }






  function handleClick(number: number) {
    setClicked(number)
    setProgress(number)
  }
  function ProgressBar() {
  }
  return (
    <div>
      <Navbar></Navbar>
      {pd ? <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10" >
        <div className="min-w-0 flex-1 pb-8">
          <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">New Personal Development Checkpoint</h3>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="hidden sm:block">
            <button onClick={() => { setPD(!pd) }} type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              Switch to WOL
            </button>
          </span>
          <span className="sm:ml-3">
            <button onClick={(event) => { handleSubmit(event) }} type="submit" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {/* <a href={`/candidates/${person.id}/checkpoint`} className="inline-flex items-center"> */}
              <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              Save
              {/* </a> */}
            </button>
          </span>
        </div>
      </div> : <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10" >
        <div className="min-w-0 flex-1 pb-8">
          <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">New WOL Checkpoint</h3>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="hidden sm:block">
            <button onClick={() => { setPD(!pd) }} type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              Switch to Personal Development
            </button>
          </span>
          <span className="sm:ml-3">
            <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {/* <a href={`/candidates/${person.id}/checkpoint`} className="inline-flex items-center"> */}
              <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              Save
              {/* </a> */}
            </button>
          </span>
        </div>
      </div>}

      {pd ? <PDForm ratings={ratings} onRatingChange={handleRatingChange} onSubmit={handleSubmit} />

        : <WOLForm></WOLForm>




      }
    </div >
  )
}
export default Checkpoint


