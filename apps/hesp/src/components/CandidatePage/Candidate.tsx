import Link from "next/link";
import Navbar from "../Navbar";
import Chart from "./RadarChart";
import { useRouter } from "next/router";

import AssignPerson from "./AssignCoach";
import {
  ITrainee,
  IUser,
  IWOLcheckpoint,
  WOLCheckpointProps,
} from "../../../types";
import { decodeToken } from "../../../lib/auth/jwt";
import { PDCcheckpoint } from "@prisma/client";

interface IPageProps {
  person: ITrainee;
  WOLs: IWOLcheckpoint[];
  PDs: PDCcheckpoint[];
  decodedToken: Partial<IUser>;
}

function Candidate({ person, WOLs, PDs, decodedToken }: IPageProps) {
  const router = useRouter();
  const { role } = decodedToken;
  function handleClickNewCheckpoint(event: React.MouseEvent) {
    event.preventDefault();
    router.push(`/candidates/${person.id}/checkpoint`);
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
                Edit
              </button>
            </span>

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
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 xl:grid-cols-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {person.firstName + " " + person.lastName}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Telephone
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {person.phone}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {person.email}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Reference
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {person.registerNumber}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">About</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                      anim incididunt cillum culpa consequat. Excepteur qui
                      ipsum aliquip consequat sint. Sit id mollit nulla mollit
                      nostrud in ea officia proident. Irure nostrud pariatur
                      mollit ad adipisicing reprehenderit deserunt qui eu.
                    </dd>
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
              See All Checkpoints{" "}
            </a>
          </button>
        </span>
      </div>
    </div>
  );
}
export default Candidate;
