import Link from "next/link";
import { ITrainee, IUser } from "../../types";
import moment from "moment";
import Navbar from "./Navbar";
import { useState } from "react";
import AddCoach from "./Team/FormAddCoach";
import { ProfilePicture } from "./ProfilePicture";

interface props {
  user: IUser[];
  jwt: {
    role: "STAFF" | "ADMIN";
    id: number;
  };
  Trainees: ITrainee[];
}

const List: React.FC<props> = ({ user, jwt, Trainees }) => {
  const showIHe = jwt.role === "STAFF";
  const [showAddCandidateForm, setShowAddCandidateForm] = useState(false);

  const matchingUser = user.filter((user: IUser) => {
    return user.id == jwt.id;
  });

  const dataToMap = showIHe ? matchingUser[0]?.Trainee : Trainees;

  const lastCheckpoint = (person: ITrainee) => {
    const pdc = person.PDCcheckpoint;
    if (pdc !== undefined && pdc.length > 0) {
      const last = pdc[pdc.length - 1];
      const ago = moment(last.createdAt).fromNow();
      return ago;
    } else {
      return "No checkpoint has been created";
    }
  };

  const thirtyDaysPassed = (person: ITrainee) => {
    if (person.PDCcheckpoint.length === 0) {
      return true;
    }
    const currentDate = new Date();
    const lastPDDate = new Date(
      person.PDCcheckpoint[person.PDCcheckpoint.length - 1]?.createdAt
    );

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

  return (
    <div className="h-screen">
      <Navbar headerText={"HESP Program"} user={jwt}></Navbar>
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 pr-8 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setShowAddCandidateForm(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              + Add new candidate
            </button>
          </div>
        </div>
        <AddCoach
          showForm={showAddCandidateForm}
          closeForm={() => setShowAddCandidateForm(false)}
        />
        <div className="mt-8 flow-root">
          {dataToMap && dataToMap.length > 0 && dataToMap.length > 0 ? (
            <div className="px-4 sm:px-6 lg:px-8 pb-12">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-80 text-left text-sm font-medium text-gray-500 sm:pl-6"
                            >
                              NAME
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-medium text-gray-500"
                            >
                              LAST CHECKPOINT
                            </th>

                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">New Checkpoint</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {dataToMap.map((person: ITrainee, index: number) => (
                            <tr data-cy="trainee-row" key={index}>
                              <td className="flex items-center whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                                <Link
                                  href={`/candidates/${person.id}`}
                                  className="text-gray-900 flex w-full"
                                >
                                  <div className="mr-3 shrink-0">
                                    <ProfilePicture person={person} />
                                  </div>
                                  <div>
                                    {person.firstName + " " + person.lastName}
                                    <p className="whitespace-nowrap  text-sm text-gray-500">
                                      {person.email}
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                {" "}
                                {lastCheckpoint(person)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {" "}
                                <Link
                                  href={`/candidates/${person.id}?edit`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                  <span className="sr-only">
                                    , {person.firstName + " " + person.lastName}
                                  </span>
                                </Link>
                              </td>
                              {thirtyDaysPassed(person) ? (
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <a
                                    href={`/candidates/${person.id}/checkpoint`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                    data-cy="trainee-new-checkpoint"
                                    data-cy-target={`${person.firstName}`}
                                  >
                                    New Checkpoint
                                    <span className="sr-only">
                                      ,{" "}
                                      {person.firstName + " " + person.lastName}
                                    </span>
                                  </a>
                                </td>
                              ) : (
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <div className="relative group">
                                    <a
                                      href={`/candidates/${person.id}/checkpoint`}
                                      className="pointer-events-none text-gray-300 hover:text-indigo-900"
                                      data-cy="trainee-new-checkpoint"
                                      data-cy-target={`${person.firstName}`}
                                    >
                                      New Checkpoint
                                    </a>
                                    <div className="absolute bottom-0   flex-col items-center hidden mb-6 group-hover:flex">
                                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                                        The last checkpoint was created less
                                        then 30 days ago
                                      </span>
                                      <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                    </div>
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                No candidates
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                You currently don't have any candidates assigned to you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
