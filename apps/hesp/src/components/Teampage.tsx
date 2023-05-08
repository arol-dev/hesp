import Link from "next/link";
import AddCoach from "./FormAddCoach";
import { useState } from "react";
import { IUser } from "../../types";
import DeleteCoach from "./DeleteCoach";

interface TeampageProps {
  coaches: IUser[];
  jwt: IUser;
}

function Teampage({ coaches, jwt }: TeampageProps) {
  const isAmin = jwt.role === "ADMIN";
  const [showAddCoachForm, setShowAddCoachForm] = useState(false);
  const [showDeleteCoach, setShowDeleteCoach] = useState(false);

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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {isAmin && (
            <button
              onClick={handleAddNewCoach}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              + Add new coach
            </button>
          )}
        </div>
      </div>
      <AddCoach
        showForm={showAddCoachForm}
        closeForm={handleAddCoachFormClose}
      />
      <div className="mt-8 flow-root">
        {coaches && coaches.length > 0 ? (
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      ASSIGNED HES
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {coaches.map((person, index) => (
                    <>
                      <DeleteCoach
                        showWindow={showDeleteCoach}
                        closeWindow={handleDeleteCoachWindowClose}
                        coach={person}
                      />
                      <tr key={index}>
                        <td className="flex whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <div className="flex-shrink-0 mr-5">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                          <Link
                            href={`/team/${person.id}`}
                            className="text-black hover:text-indigo-900"
                          >
                            {person.firstName + " " + person.lastName}
                            <p className="whitespace-nowrap text-sm text-gray-500">
                              {person.email}
                            </p>
                          </Link>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.Trainee.length}
                        </td>
                        {isAmin && (
                          <>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <a
                                className="text-indigo-600 hover:text-indigo-900"
                                href={`/team/${person.id}`}
                              >
                                Edit
                                <span className="sr-only">
                                  , {person.firstName + " " + person.lastName}
                                </span>
                              </a>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <button
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={() => handleDeleteCoach()}
                              >
                                Remove
                                <span className="sr-only">
                                  , {person.firstName + " " + person.lastName}
                                </span>
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
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
  );
}
export default Teampage;
