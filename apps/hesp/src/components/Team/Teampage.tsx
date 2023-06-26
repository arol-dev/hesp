import Link from "next/link";
import AddCoach from "./FormAddCoach";
import { useState } from "react";
import { IUser } from "../../../types";
import DeleteCoach from "./DeleteCoach";
import Navbar from "../Navbar";
import React from "react";

interface TeampageProps {
  coaches: IUser[];

  jwt: IUser;
}

function Teampage({ coaches, jwt }: TeampageProps) {
  const [showAddCoachForm, setShowAddCoachForm] = useState(false);
  const [showDeleteCoach, setShowDeleteCoach] = useState(false);

  const isAdmin = jwt.role === "ADMIN";

  function handleAddNewCoach() {
    setShowAddCoachForm(true);
  }

  function handleAddCoachFormClose() {
    setShowAddCoachForm(false);
  }

  function handleDeleteCoach() {
    setShowDeleteCoach(true);
  }
  function handleDeleteCoachWindowClose() {
    setShowDeleteCoach(false);
  }

  return (
    <div>
      <Navbar headerText={"Admin"} user={jwt}></Navbar>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"> </div>
          {isAdmin && (
            <button
              onClick={handleAddNewCoach}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              + Add new coach
            </button>
          )}
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none "></div>
        </div>
        <AddCoach
          showForm={showAddCoachForm}
          closeForm={handleAddCoachFormClose}
        />
        <div className="mt-8 flow-root">
          {coaches && coaches.length > 0 ? (
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          NAME
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          ASSIGNED HES
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
                          <span className="sr-only">Remove</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {coaches.map((coach, index) => (
                        <React.Fragment key={index}>
                          <DeleteCoach
                            showWindow={showDeleteCoach}
                            closeWindow={handleDeleteCoachWindowClose}
                            coach={coach}
                          />
                          <tr key={index}>
                            <td className=" flex whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              <div className="flex-shrink-0 mr-5">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={
                                    coach.picture ||
                                    "https://www.w3schools.com/howto/img_avatar.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <Link
                                href={`/team/${coach.id}`}
                                className="text-black hover:text-indigo-900"
                              >
                                <div>
                                  {coach.firstName + " " + coach.lastName}
                                </div>
                                <p className="whitespace-nowrap text-sm text-gray-500">
                                  {coach.email}
                                </p>
                              </Link>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {" "}
                              {coach.Trainee.length}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <a
                                className={
                                  isAdmin || coach.id === jwt.id
                                    ? `text-indigo-600 hover:text-indigo-900`
                                    : "text-gray-400 cursor-not-allowed"
                                }
                                href={isAdmin ? `/team/${coach.id}` : "#"}
                              >
                                Edit{" "}
                                <span className="sr-only">{`, ${coach.firstName} ${coach.lastName}`}</span>
                              </a>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {" "}
                              <button
                                className={`${
                                  isAdmin
                                    ? `text-indigo-600 hover:text-indigo-900 cursor-pointer`
                                    : "text-gray-400 cursor-not-allowed"
                                }`}
                                onClick={() => handleDeleteCoach()}
                                disabled={!isAdmin}
                              >
                                Remove
                                <span className="sr-only">
                                  , {coach.firstName + " " + coach.lastName}
                                </span>
                              </button>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                No team members
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                There is currently no coaches registered in the app.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teampage;
