import { useState } from "react"

function PDForm({ ratings, onRatingChange, onSubmit }) {

  const [checked, setChecked] = useState(0)


  function handleCheckboxChange(number: number) {
    setChecked(number);
  }







  function handleRatingChange(index, value) {
    onRatingChange(index, value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }




  return (
    <div>
      {ratings.map((rating, index) => (
        <div key={index} className="space-y-10 divide-y divide-gray-900/10 pl-5 pr-5 pb-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">{rating.name}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 pb-4">
                The trainee trust in the established action plan.    </p>
              <div className="h-2 relative max-w-screen-md mx-auto">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-1/6 w-full bg-gray-300 rounded-full">
                    <div
                      className=" h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      style={{ width: `${(rating.value / 9) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} action="/api/form-PD" method="post" className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
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
                            <label htmlFor={`${rating.name}-${number}`} key={`${index}-${number}`}>
                              <input
                                type="checkbox"
                                name={`${rating.name}`}
                                id={`${rating.name}-${number}`}
                                value={`${number}`}
                                checked={rating.value === number}
                                onChange={() => handleRatingChange(index, number)}
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
        </div >

      ))}

    </div >
  )
}

export default PDForm