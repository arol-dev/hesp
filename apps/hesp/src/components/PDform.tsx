import { useState } from "react"

function PDForm() {

  const [progress, setProgress] = useState(0)


  function handleClick(number: number) {
    setProgress(number)
  }

  return (
    <div>

      {/* //////////////////////////////////
        TRUST
         ///////////////////////////////// */}

      <div className="space-y-10 divide-y divide-gray-900/10 pl-5 pr-5 pb-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Trust</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 pb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.           </p>
            <div className="h-2 relative max-w-screen-md mx-auto">
              {[...Array(10)].map((_, index) => (
                <div className="h-1/6 w-full bg-gray-300 rounded-full">
                  <div
                    className=" h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    style={{ width: `${(progress / 9) * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>

          </div>
          <form action="/api/form" method="post" className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Satisfaction level
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md  focus-within:ring-indigo-600 sm:max-w-md">

                      {/* <span className="hidden sm:block">
                      <button onClick={() => { handleClick(1) }} type="button" className=" mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        1
                      </button>
                      <button onClick={() => { handleClick(2) }} type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        2
                      </button>
                      <button onClick={() => { handleClick(3) }} type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        3
                      </button>
                      <button onClick={handleClick} type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        4
                      </button>
                      <button onClick={handleClick} type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        5
                      </button>
                      <button onClick={handleClick} type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        6
                      </button>
                      <button onClick={handleClick} type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        7
                      </button>
                      <button onClick={handleClick} type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        8
                      </button>
                      <button onClick={handleClick} type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        9
                      </button>
                    </span> */}



                      {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                        <label htmlFor="progress" key="progress">
                          <button
                            id="progress"
                            name="progress"
                            key={number}
                            value={progress}
                            onClick={() => handleClick(number)}
                            type="button"
                            className={`mr-2 inline-flex items-center rounded-md ${progress === number
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-900"
                              } px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                          >
                            {number}
                          </button>
                        </label>


                      ))} */}

                      <div className="flex items-center space-x-2">
                        <label htmlFor="rating" className="sr-only">
                          Rate this item:
                        </label>
                        <input type="hidden" name="rating" id="rating" className="hidden" />
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                          <label htmlFor={`rating-${number}`} key={`rating-${number}`}>
                            <input
                              type="radio"
                              name="rating"
                              id={`rating-${number}`}
                              value={number}
                              onClick={() => handleClick(number)}
                              className="hidden"
                            />
                            <button
                              type="button"
                              className={`inline-flex items-center px-3 py-2 text-sm font-semibold rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ${progress === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'
                                } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                              {number}
                            </button>
                          </label>
                        ))}
                      </div>








                      {/* 
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                        <label htmlFor="number" key={number}>
                          <input
                            id={`number-${number}`}
                            type="radio"
                            name="number"
                            value={number}
                            checked={progress === number}
                            onChange={() => handleClick(number)}
                            className={`mr-2 inline-flex items-center rounded-md ${progress === number
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-900"
                              } px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300`}
                          />
                          {number}
                        </label>
                      ))} */}







                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    What makes you feel this way?
                  </label>
                  <div className="mt-2">
                    <label htmlFor="trust">
                      <textarea
                        id="trust"
                        name="trust"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                      />
                    </label>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">Brief description for your profile. URLs are hyperlinked.</p>
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    What can you do to improve your satisfaction level?                  </label>
                  <div className="mt-2">
                    <label htmlFor="improve">
                      <textarea
                        id="improve"
                        name="improve"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                      />
                    </label>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">Brief description for your profile. URLs are hyperlinked.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button type="submit" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>







        {/* //////////////////////////////////
         WILL FOLLOW
         ///////////////////////////////// */}



        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Will Follow</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.           </p>
          </div>
          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                    Satisfaction level
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md  focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="hidden sm:block">
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          1
                        </button>
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          2
                        </button>
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          3
                        </button>
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          4
                        </button>
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          5
                        </button>
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          6
                        </button>
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          7
                        </button>
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          8
                        </button>
                        <button type="button" className="mr-2 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          9
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="feel" className="block text-sm font-medium leading-6 text-gray-900">
                    What makes you feel this way?
                  </label>
                  <div className="mt-2">
                    <textarea
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
            {/* <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default PDForm