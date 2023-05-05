'use client'

import Link from "next/link";
import Navbar from "./Navbar";
import Chart from "./RadarChart";
import { useRouter } from "next/router";

import AssignPerson from "./AssignCoach";


import { useState, useEffect } from "react";

function Candidate({ person, updatePerson, WOLs, PDs }: any) {
  

  const router = useRouter()

  function handleCheckLastCreated(event: React.MouseEvent) {
    event.preventDefault();

    const params = new URLSearchParams();


    params.append('userId', person.id.toString());

    fetch("/api/monthValidator", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => {
      if (response.ok) {
        router.push(`/candidates/${person.id}/checkpoint`)
      } else {
        window.alert(`A checkpoint was already created for trainee ${person.firstName + " " + person.lastName} within the last month.`)
      }
    });
  }

  const [editMode, setIsEditMode] = useState(false)
  const [personData, setPersonData] = useState({ ...person })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonData({ ...personData, [name]: value });
  };

  // console.log('updatePerson', updatePerson, 'personData', personData, 'person',person)
  const toggleEditMode = () => {

    if (editMode) {
      // console.log('updatePerson----->', updatePerson, 'personData', personData, 'person',person)
 
     updatePerson(personData);
    }
    setIsEditMode(!editMode);
  };


  return (
    <div>
      <Navbar></Navbar>
      <div className="pl-5 pr-5">
        <div className="lg:flex lg:items-center lg:justify-between ">
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {person.firstName + " " + person.lastName}
            </h3>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <AssignPerson />
            <span className="hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={toggleEditMode}
              >
                <svg
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                {editMode ? 'Save' : 'Edit'}
              </button>
            </span>

            <span className="sm:ml-3">
              <button
                onClick={(event) => handleCheckLastCreated(event)}
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <a
                  href={`/candidates/${person.id}/checkpoint`}
                  className="inline-flex items-center"
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
                  New Checkpoint
                </a>
              </button>
            </span>

            {/* THIS IS NOT USED NOW. CHECK IF WE NEED IT! */}

            {/* <!-- Dropdown --> */}
            <div className="relative ml-3 sm:hidden">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                id="mobile-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                More
                <svg
                  className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* <!--
            Dropdown menu, show/hide based on menu state.
            
            Entering: "transition ease-out duration-200"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
          --> */}
              <div
                className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="mobile-menu-button"
                tabIndex={-1}
              >
                {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="mobile-menu-item-0"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="mobile-menu-item-1"
                >
                  View
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div>
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Applicant Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and application.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="border-t border-gray-200">

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      {editMode ? (


                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                          {editMode ? (
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                              {editMode ? (
                                <div className="flex">
                                  <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    autoComplete="given-name"
                                    value={personData.firstName}
                                    onChange={handleInputChange}
                                    style={{
                                      width: personData.firstName.length > 0
                                        ? personData.firstName.length * 18 + "px"
                                        : "32px"
                                    }}
                                    className="shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 ml-4 flex-grow-1 flex-shrink-1"
                                  />
                                  <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    autoComplete="family-name"
                                    value={personData.lastName}
                                    onChange={handleInputChange}
                                    style={{
                                      width: personData.lastName.length > 0
                                        ? personData.lastName.length * 18 + "px"
                                        : "32px"
                                    }}
                                    className="shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0 flex-grow-1 flex-shrink-1"
                                  />
                                </div>
                              ) : (
                                <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {personData.firstName + " " + personData.lastName}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {personData.firstName + " " + personData.lastName}
                            </div>
                          )}
                        </div>

                      ) : (
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {personData.firstName + " " + personData.lastName}
                        </dd>
                      )}
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      {editMode ? (
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          autoComplete="off"
                          value={personData.phone}
                          onChange={handleInputChange}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-mdmt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                        />
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {personData.phone}
                        </dd>
                      )}
                    </div>



                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      {editMode ? (
                        <input
                          type="text"
                          name="email"
                          id="email"
                          autoComplete="email"
                          value={personData.email}
                          onChange={handleInputChange}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-mdmt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                        />
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {personData.email}
                        </dd>
                      )}
                    </div>


                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">About</dt>{editMode ? (
                        <input
                          type="text"
                          name="about"
                          id="about"
                          autoComplete="off"
                          value={personData.about}
                          onChange={handleInputChange}
                          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-mdmt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                        />
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {personData.about}
                        </dd>
                      )}
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <img src="/profile_pic.png" className="pl-5" />
        </div>
        <div className="px-5 py-5">
          <Chart person={person} PDs={PDs} WOLs={WOLs}></Chart>
        </div>
        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <a
              href={`/candidates/${person.id}/checkpoints`}
              className="inline-flex items-center"
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
              See All Checkpoints                </a>
          </button>
        </span>
      </div>
    </div>

  );
}
export default Candidate;