import { useEffect, useState } from "react";
import { PDFormProps } from "../../../../types";


function PDForm({ onRatingChange }: PDFormProps) {

  const [ratings, setRatings] = useState([
    {
      name: "Trust",
      body: "trust",
      description: "The trainee trust in the established action plan",
      value: 0,
    },
    {
      name: "Follow",
      body: "willFollow",
      description: "He will follow the action plan",
      value: 0,
    },
    {
      name: "Task retention",
      body: "retention",
      description: "He will remember what he should do",
      value: 0,
    },
    {
      name: "Plan commitment",
      body: "commitment",
      description: "He is committed with the formation",
      value: 0,
    },
    {
      name: "CV",
      body: "cv",
      description: "His CV (resume) is done",
      value: 0,
    },
    {
      name: "Interviews",
      body: "readyForInterviews",
      description: "He is ready to job interviews",
      value: 0,
    },
    {
      name: "Advancement",
      body: "advancement",
      description: "He is advancing well",
      value: 0,
    },
  ]);


  useEffect(() => {
    onRatingChange(ratings);
  }, [ratings, onRatingChange]);


  function handleRatingChange(index: number, value: number) {
    setRatings((prevRatings) => {
      const updatedRatings = prevRatings.map((rating, i) => {
        if (i === index) {
          return { ...rating, value };
        }
        return rating;
      });
      return updatedRatings;
    });
  }

  return (
    <div>
      {ratings.map((rating, index) => (
        <div
          key={index}
          className="space-y-10 divide-y divide-gray-900/10 pl-5 pr-5 pb-10"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {rating.name}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 pb-4">
                {rating.description}{" "}
              </p>
              <div className="h-2 rounded-full bg-gray-300 w-1/2">
                <div
                  className={`h-full rounded-full ${rating.value >= 4
                    ? "bg-gradient-to-r from-green-400 to-green-600"
                    : rating.value >= 3
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                      : "bg-gradient-to-r from-red-400 to-red-600 "
                    }`}
                  style={{ width: `${(rating.value / 5) * 100}%` }}
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
                          {[1, 2, 3, 4, 5].map((number) => (
                            <label
                              htmlFor={`${rating.name}-${number}`}
                              key={`${index}-${number}`}
                            >
                              <input
                                type="checkbox"
                                name={`${rating.name}`}
                                id={`${rating.name}-${number}`}
                                value={`${number}`}
                                checked={rating.value === number}
                                onChange={() =>
                                  handleRatingChange(index, number)
                                }
                                className="hidden"
                              />
                              <span
                                className={`${rating.value === number
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
                </div>
              </div>
            </form>
          </div>
        </div>
      ))}
    </div >
  )
}

export default PDForm;