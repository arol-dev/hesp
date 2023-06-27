import { PDCcheckpoint, WOLcheckpoint } from "@prisma/client";
import Navbar from "../Navbar";
import { IPDCcheckpoint, ITrainee, IWOLcheckpoint } from "../../../types";
import { useState } from "react";
import PDForm from "./PD/PDform";
import LastPD from "./PD/LastPD";
import LastWOL from "./WOL/LastWOL";
import LastPDNotes from "./PD/Session Notes/LastPDNotes";
import moment from "moment";

type ICheckpointsProps = {
  id: number;
  WOLs: IWOLcheckpoint[];
  PDs: IPDCcheckpoint[];
  person: ITrainee;
};
function Checkpoints({ id, WOLs, PDs, person }: ICheckpointsProps) {
  const [pd, setPD] = useState(false);

  const createdAt = (date: Date) => {
    const creationDate = moment(date).format("ll");
    return creationDate;
  };

  return (
    <div>
      <Navbar headerText={"HESP Program"}></Navbar>

      <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10 ">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <a
                  href={`/candidates/${id}`}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {person.firstName + " " + person.lastName}{" "}
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  All Checkpoints
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
              All Professional Development Checkpoints
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
          </div>
        </div>
      ) : (
        <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              All WOL Checkpoints
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
          </div>
        </div>
      )}

      {pd
        ? PDs?.map((pd) => (
            <div>
              <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
                <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                  {createdAt(pd.createdAt)}
                </h3>
              </div>
              <LastPD lastPDCheckpoint={pd}> </LastPD>
              <LastPDNotes lastPDCheckpoint={pd}></LastPDNotes>
            </div>
          ))
        : WOLs?.map((wol) => (
            <div>
              <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
                <h3 className="mt-8 mb-0 text-lg font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                  {createdAt(wol.createdAt)}
                </h3>
              </div>
              <LastWOL children lastWOLCheckpoint={wol}></LastWOL>
            </div>
          ))}
    </div>
  );
}

export default Checkpoints;
