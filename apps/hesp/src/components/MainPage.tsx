import Link from "next/link";
import { ITrainee, IUser } from "../../types";

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

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => console.log(matchingUser)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            + Add new candidate
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        {matchingUser && matchingUser.length > 0 ? (
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
                      LAST CHECKPOINT
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      HE STATUS
                    </th>
                    {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">New Checkpoint</span>
                  </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dataToMap.map((person: any, index: number) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <Link
                          href={`/candidates/${person.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {person.firstName + " " + person.lastName}
                          <p className="whitespace-nowrap  text-sm text-gray-500">
                            {person.email}
                          </p>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.checkpoint}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.status}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <span className="sr-only">
                            , {person.firstName + " " + person.lastName}
                          </span>
                        </a>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
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
};

export default List;
