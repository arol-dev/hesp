import Link from "next/link";
import { ITrainee, IUser } from "../../types";
import moment from "moment";
import Navbar from "./Navbar";

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

  const matchingUser = user.filter((user: IUser) => {
    console.log(user.id);
    return user.id == jwt.id;
  });

  const dataToMap = showIHe ? matchingUser[0].Trainee : Trainees;

  const lastCheckpoint = (person: ITrainee) => {
    const pdc = person.PDCcheckpoint;
    const last = pdc[pdc.length - 1];
    if (last) {
      const ago = moment(last.createdAt).startOf("day").fromNow();
      return ago;
    } else {
      return 'No checkpoint has been created'
    }
  }

  return (
    <div className="h-screen">
      <Navbar headerText={"HESP Program"}></Navbar>
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => console.log(matchingUser)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              + Add new candidate
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          {matchingUser && matchingUser.length > 0 && dataToMap.length > 0 ? (
            <div className="px-4 sm:px-6 lg:px-8 pb-12">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-80 text-left text-sm font-medium text-gray-500 sm:pl-6">
                              NAME
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-gray-500">
                              LAST CHECKPOINT
                            </th>

                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">New Checkpoint</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {dataToMap.map((person: ITrainee, index: number) => (
                            <tr key={index}>

                              <td className="flex whitespace-nowrap py-4 pl-4  pr-80 text-sm font-medium text-gray-900 sm:pl-6">
                                <div className="mr-3">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                  />
                                </div>
                                <Link
                                  href={`/candidates/${person.id}`}
                                  className="text-gray-900"
                                >
                                  {person.firstName + " " + person.lastName}
                                  <p className="whitespace-nowrap  text-sm text-gray-500">
                                    {person.email}
                                  </p>
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">   {lastCheckpoint(person)}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                                <span className="sr-only">
                                  , {person.firstName + " " + person.lastName}
                                </span>
                              </a></td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><a
                                href={`/candidates/${person.id}/checkpoint`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                New Checkpoint
                                <span className="sr-only">
                                  , {person.firstName + " " + person.lastName}
                                </span>
                              </a>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) :
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                No candidates
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                You currently don't have any candidates assigned to you.
              </p>
            </div>

          }
        </div >
      </div >
    </div>
  );
};

export default List;
