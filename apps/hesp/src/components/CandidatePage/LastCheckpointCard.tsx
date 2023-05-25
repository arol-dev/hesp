import Link from "next/link";
import { IPDCcheckpoint, IUser, IWOLcheckpoint } from "../../../types";
import moment from "moment";

interface IPageProps {

  coach: IUser;
  lastPD: IPDCcheckpoint;
  lastWOL: IWOLcheckpoint
}

function LastCheckpointCard({ coach, lastPD, lastWOL }: IPageProps) {

  const lastCheckpointDate = lastPD?.createdAt
  const dateToShow = moment(lastCheckpointDate).format('ll');

  const WOLdataToPrint = {
    "Health": lastWOL.health,
    "Career / Work": lastWOL.work,
    "Finances": lastWOL.finances,
    "Environment": lastWOL.environment,
    "Love": lastWOL.love,
    "Family and Friends": lastWOL.familyFriends,
    "Personal Development": lastWOL.personalDevelopment,
    "Fun": lastWOL.fun
  }

  return (

    <div className='flex justify-between items-center'>
      <div className=' w-full overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Last Checkpoint
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 xl:grid-cols-4">
              <dt className="text-sm font-medium text-gray-500">
                Coach
              </dt>
              <dd className=" flex whitespace-nowrap  pr-3 text-sm font-medium text-gray-900 ">
                <div className="flex-shrink-0 mr-5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {lastCheckpointDate !== undefined ? <p> {dateToShow} </p> : ("No checkpoint has been created yet")}
              </dd>
            </div>

            {Object.entries(WOLdataToPrint).map(([key, value]) => (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3  xl:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {key}
                </dt>
                <dd className=" mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <div className="h-2 rounded-full bg-gray-300 w-40">
                      <div
                        className={` h-full rounded-full ${value >= 7
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : value >= 4
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            : "bg-gradient-to-r from-red-400 to-red-600"
                          }`}
                        style={{ width: `${(value / 9) * 100}%` }}
                      >
                      </div>
                    </div>
                    <div className="ml-5">
                      {value}
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default LastCheckpointCard