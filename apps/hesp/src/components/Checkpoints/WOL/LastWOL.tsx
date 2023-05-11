import { ReactNode, useState } from "react"
import { IWOLcheckpoint, WOLTopic, WOLTopics } from "../../../../types"


interface ILastWOLProps {
  lastWOLCheckpoint: IWOLcheckpoint
  children: ReactNode;
}

function LastWOL({ lastWOLCheckpoint }: ILastWOLProps) {

  const [WOLformdata, setWOLformdata] = useState<WOLTopics>([
    {
      name: "Health",
      body: "health",
      value: lastWOLCheckpoint.health,
      feel: lastWOLCheckpoint.healthFeel,
      improve: lastWOLCheckpoint.healthImprove
    },
    {
      name: "Career / Work",
      body: "career",
      value: lastWOLCheckpoint.work,
      feel: lastWOLCheckpoint.workFeel,
      improve: lastWOLCheckpoint.workImprove
    },
    {
      name: "Finances",
      body: "finances",
      value: lastWOLCheckpoint.finances,
      feel: lastWOLCheckpoint.financesthFeel,
      improve: lastWOLCheckpoint.financesthImprove
    },
    {
      name: "Environment",
      body: "environment",
      value: lastWOLCheckpoint.environment,
      feel: lastWOLCheckpoint.environmentFeel,
      improve: lastWOLCheckpoint.environmentImprove
    },
    {
      name: "Love",
      body: "love",
      value: lastWOLCheckpoint.love,
      feel: lastWOLCheckpoint.loveFeel,
      improve: lastWOLCheckpoint.loveImprove
    }, {
      name: "Family and Friends",
      body: "familyfriends",
      value: lastWOLCheckpoint.familyFriends,
      feel: lastWOLCheckpoint.familyFriendsFeel,
      improve: lastWOLCheckpoint.familyFriendsImprove
    },
    {
      name: "Personal Development",
      body: "personaldevelopment",
      value: lastWOLCheckpoint.personalDevelopment,
      feel: lastWOLCheckpoint.personalDevelopmentFeel,
      improve: lastWOLCheckpoint.personalDevelopmentImprove
    },
    {
      name: "Fun",
      body: "fun",
      value: lastWOLCheckpoint.fun,
      feel: lastWOLCheckpoint.funFeel,
      improve: lastWOLCheckpoint.funImprove
    }
  ])


  return (
    <>
      {WOLformdata.map((topic: WOLTopic, index) => (
        <div
          data-cy="last-wol-topic-card"
          key={index}
          className="space-y-10 divide-y divide-gray-900/10 pl-5 pr-5 pb-10"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {topic.name}
              </h2>
              <div className="h-2 rounded-full bg-gray-300 w-1/2">
                <div
                  className={`h-full rounded-full ${topic.value >= 7
                    ? "bg-gradient-to-r from-green-400 to-green-600"
                    : topic.value >= 4
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                      : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}
                  style={{ width: `${(topic.value / 9) * 100}%` }}
                ></div>
              </div>
            </div>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Satisfaction level
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md  focus-within:ring-indigo-600 sm:max-w-md">
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                            <label
                              htmlFor={`${topic.name}-${number}`}
                              key={`${index}-${number}`}
                            >
                              <input
                                disabled={true}
                                type="checkbox"
                                name={`${topic.name}`}
                                id={`${topic.name}-${number}`}
                                value={`${topic.value}`}
                                // readOnly={topic.value === number}
                                className="hidden"
                              />
                              <span
                                className={`${topic.value === number
                                  ? "bg-blue-500 text-white"
                                  : "bg-white text-gray-900"
                                  } inline-flex items-center justify-center rounded-md px-3 py-1.5 border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-50`}
                              >
                                {number}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="feel" className="block text-sm font-medium leading-6 text-gray-900">
                      What makes you feel this way?
                    </label>
                    <div className="mt-2">
                      <textarea
                        disabled={true}
                        id="feel"
                        name="feel"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={topic.feel}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-400">Brief description for your profile. URLs are hyperlinked.</p>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="improve" className="block text-sm font-medium leading-6 text-gray-900">
                      What can you do to improve your satisfaction level?                  </label>
                    <div className="mt-2">
                      <textarea
                        disabled={true}
                        id="improve"
                        name="improve"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={topic.improve}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-400">Brief description for your profile. URLs are hyperlinked.</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ))}
    </>
  )
}

export default LastWOL