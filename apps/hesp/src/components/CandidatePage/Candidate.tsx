import Navbar from "../Navbar";
import Chart from "./RadarChart";
import { useRouter } from "next/router";

import AssignPerson from "./AssignCoach";
import { ITrainee, IUser } from "../../../types";
import { useEffect, useState } from "react";
import React from "react";
import LastCheckpointCard from "./LastCheckpointCard";
import { ProfileImagePlaceholder } from "../ProfileImagePlaceholder";
import Image from "next/image";
import { CheckIcon } from "@heroicons/react/20/solid";

interface IPageProps {
  person: ITrainee;
  jwt: Partial<IUser>;
  coach: IUser;
}

function Candidate({ person, jwt, coach }: IPageProps) {
  const router = useRouter();
  const { role } = jwt;

  const lastPD = person?.PDCcheckpoint[person.PDCcheckpoint.length - 1] || null;
  const lastWOL =
    person?.WOLcheckpoint[person.WOLcheckpoint.length - 1] || null;

  const thirtyDaysPassed = () => {
    if (!lastPD) return true;
    const currentDate = new Date();
    const lastPDDate = new Date(lastPD.createdAt);

    const currentDateTimestamp = currentDate.getTime();
    const lastPDTimestamp = lastPDDate.getTime();

    // Calculate the difference in milliseconds
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const thirtyDaysMilliseconds = 30 * millisecondsPerDay; // Number of milliseconds in 30 days
    const timeDifference = currentDateTimestamp - lastPDTimestamp;

    // Check if 30 days have passed
    if (timeDifference >= thirtyDaysMilliseconds) {
      return true;
    }
  };

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
      router.replace(router.asPath);
    } else window.alert("Personal information can't be updated");
    setIsEditing(!isEditing);
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("hello");
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    let formData = new FormData();
    if (file) {
      formData.append("picture", file);
    }

    const response = await fetch(`/api/he/${person.id}/picture`, {
      method: "PUT",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      router.replace(router.asPath);
    } else {
      console.error("Error updating coach:", result);
    }
  };

  return (
    <div>
      <Navbar headerText={"HESP Program"} user={jwt}></Navbar>
      <div className="pl-5 pr-5">
        <div className="lg:flex lg:items-center lg:justify-between ">
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {person.firstName + " " + person.lastName}
            </h3>
          </div>
          <div className="flex pb-8 lg:ml-4 lg:mt-0">
            {role === "ADMIN" && <AssignPerson />}
            <div className="flex flex-col gap-2 lg:block">
              {isEditing && (
                <label
                  htmlFor="file-upload"
                  className="mr-2 cursor-pointer inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                </label>
              )}
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
            </div>

            {!isEditing &&
              (!thirtyDaysPassed() ? (
                <div className="relative flex flex-col items-center group sm:ml-3">
                  <button
                    disabled
                    type="button"
                    className="cursor-not-allowed inline-flex items-center rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckIcon className="w-5 h-5 mr-1" />
                    New Checkpoint
                  </button>
                  <div className="absolute bottom-0   flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                      The last checkpoint was created less then 30 days ago
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                  </div>
                </div>
              ) : (
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
                </span>
              ))}
          </div>
        </div>

        <div className="flex justify-between items-stretch gap-3">
          <div className=" w-4/5 overflow-hidden bg-white shadow sm:rounded-lg">
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
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">About</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {isEditing ? (
                        <input
                          type="text"
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
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
          <div className="flex items-stretch relative flex-1">
            {person.picture ? (
              <Image
                src={person.picture}
                alt={`Profile picture of ${person.firstName} ${person.lastName}`}
                className="rounded-lg object-cover"
                fill
              />
            ) : (
              <ProfileImagePlaceholder onFileSelect={handleFileUpload} />
            )}
          </div>
        </div>
        <div className="py-5">
          <Chart person={person}></Chart>
        </div>
        {lastPD && lastWOL ? (
          <LastCheckpointCard coach={coach} lastWOL={lastWOL} lastPD={lastPD} />
        ) : (
          <></>
        )}

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
          </div>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
}
export default Candidate;
