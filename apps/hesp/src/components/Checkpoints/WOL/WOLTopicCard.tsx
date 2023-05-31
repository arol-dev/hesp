import { IWOLcheckpoint, WOLTopic } from "../../../../types";

type WOLTopicCardProps = {
  topic: WOLTopic;
  index: number;
  onRatingChange: (index: number, value: number) => void;
  onFeelChange: (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImproveChange: (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  WOLSaved: boolean
};

const WOLTopicCard: React.FC<WOLTopicCardProps> = ({ topic, index, onRatingChange, onFeelChange, onImproveChange, WOLSaved }) => {

  return (
    <>
      <div
        data-cy="wol-topic-card"
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
                style={{ width: `${(topic.value / 9) * 100}%`, transition: 'width 0.5s ease-in-out' }}
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
                              disabled={WOLSaved}
                              type="checkbox"
                              name={`${topic.name}`}
                              id={`${topic.name}-${number}`}
                              value={`${number}`}
                              checked={topic.value === number}
                              onChange={() =>
                                onRatingChange(index, number)
                              }
                              className="hidden"
                            />
                            <span
                              data-cy='bar-input'
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
                      disabled={WOLSaved}
                      onChange={(event) => onFeelChange(index, event)}
                      id="feel"
                      name="feel"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">Brief description for your profile. URLs are hyperlinked.</p>
                </div>
                <div className="col-span-full">
                  <label htmlFor="improve" className="block text-sm font-medium leading-6 text-gray-900">
                    What can you do to improve your satisfaction level?                  </label>
                  <div className="mt-2">
                    <textarea
                      disabled={WOLSaved}
                      onChange={(event) => onImproveChange(index, event)}
                      id="improve"
                      name="improve"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">Brief description for your profile. URLs are hyperlinked.</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}



export default WOLTopicCard