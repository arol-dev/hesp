import Link from "next/link";
import Navbar from "../Navbar";
import Chart from "./RadarChart";
import { useRouter } from "next/router";

import AssignPerson from "./AssignCoach";
import {
  ITrainee,
  IUser,
  IWOLcheckpoint,
  IPDCcheckpoint,
} from "../../../types";
import { PDCcheckpoint } from "@prisma/client";
import { useEffect, useState } from "react";
import React from "react";
import lastCheckpointCard from "./LastCheckpointCard";
import LastCheckpointCard from "./LastCheckpointCard";

interface IPageProps {
  person: ITrainee;
  WOLs: IWOLcheckpoint[];
  PDs: IPDCcheckpoint[];
  decodedToken: Partial<IUser>;
  coach: IUser;
  lastPDCheckpoint: IPDCcheckpoint;
  lastWOLCheckpoint: IWOLcheckpoint

}
function Candidate({ person, WOLs, PDs, decodedToken, coach, lastPDCheckpoint, lastWOLCheckpoint }: IPageProps) {
  const router = useRouter();
  const { role } = decodedToken;


  const lastPD = person?.PDCcheckpoint[person.PDCcheckpoint.length - 1] || null
  const lastWOL = person?.WOLcheckpoint[person.WOLcheckpoint.length - 1] || null


  function handleClickNewCheckpoint(event: React.MouseEvent) {
    event.preventDefault();
    router.push(`/candidates/${person.id}/checkpoint`);
  }
  const [fullName, setFullName] = useState(
    person.firstName + " " + person.lastName
  );
  const [phone, setPhone] = useState(person.phone);
  const [email, setEmail] = useState(person.email);
  const [registerNumber, setRegisterNumber] = useState(person.registerNumber);
  const [about, setAbout] = useState(person.about);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // get the full url including parameters
  const path = router.asPath;
  useEffect(() => {
    const clickedEditFromIndex = path.includes("edit");
    if (clickedEditFromIndex) {
      setIsEditing(true);
    }
  }, []);
  async function handleSave() {
    const [firstName, lastName] = fullName.split(" ");

    const data = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      registerNumber: registerNumber,
      about: about,
    };


    const path = window.location.pathname;
    const id = path.split("/").pop();

    const response = await fetch(`/api/he/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      window.alert(
        "Personal information of the candidate updated successfully"
      );
      // window.location.reload()
      router.push(`/candidates/${id}`);
    } else window.alert("Personal information can't be updated");
    setIsEditing(!isEditing);
  }

  return (
    <div>
      <Navbar headerText={"HESP Program"}></Navbar>
      <div className="pl-5 pr-5">
        <div className="lg:flex lg:items-center lg:justify-between ">
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {person.firstName + " " + person.lastName}
            </h3>
          </div>
          <div className="flex pb-8 lg:ml-4 lg:mt-0">
            {role === "ADMIN" && <AssignPerson />}
            <span className="hidden sm:block">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="inline-flex ml-2 items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              ) : (
                <></>
              )}
            </span>

            {lastPDCheckpoint && lastWOLCheckpoint ?

              <div className="relative flex flex-col items-center group sm:ml-3">
                <button
                  disabled
                  type="button"
                  className="cursor-not-allowed inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                </button>
                <div className="absolute bottom-0   flex-col items-center hidden mb-6 group-hover:flex">
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">The last checkpoint was created less then 30 days ago</span>
                  <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                </div>
              </div>
              :
              <span className="sm:ml-3">
                <button
                  onClick={(event) => handleClickNewCheckpoint(event)}
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
              </span>}
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div className=' w-4/5 overflow-hidden bg-white shadow sm:rounded-lg'>

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
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 xl:grid-cols-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={fullName}
                            className="shadow-sm border-solid  focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </>
                      ) : (
                        fullName
                      )}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Telephone
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditing ? (
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                        />
                      ) : (
                        person.phone
                      )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditing ? (
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                        />
                      ) : (
                        person.email
                      )}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Reference
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditing ? (
                        <input
                          type="text"
                          value={registerNumber}
                          onChange={(e) => setRegisterNumber(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                        />
                      ) : (
                        person?.registerNumber
                      )}
                    </dd>
                  </div>
                  <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      About
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      {isEditing ? (
                        <input
                          type='text'
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md'
                        />
                      ) : (
                          person?.about
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <img src="/profile_pic.png" className="pl-5" />
        </div>
        <div className="py-5">
          <Chart person={person} PDs={PDs} WOLs={WOLs}></Chart>
        </div>
        {lastPD && lastWOL ? <LastCheckpointCard coach={coach} lastWOL={lastWOL} lastPD={lastPD} /> : <></>}


        {lastPD && lastWOL ? (
          <div className="flex justify-center mt-5 mb-32">
            <span className="sm:ml-3">
              <button
                type="button"
                className="mt-5 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                  See All Checkpoints{" "}
                </a>
              </button>
            </span>
          </div>) : <> </>}
      </div >
    </div >
  );
}
export default Candidate;
