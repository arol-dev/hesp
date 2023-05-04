function DeleteCoach({ closeWindow, showWindow }) {
  if (!showWindow) {
    return null
  }


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full max-w-xl">
          <div className="p-6 flex items-center">
            <div className="h-36 mr-4 pt-2">
              <div className="w-10 h-10  bg-red-200 rounded-full flex items-center justify-center  ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-500 pl-2 pr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 mb-4">
                Delete coach
              </h1>
              <p className="text-gray-500 mb-4 mr-2">
                Are you sure you want to deactivate this account? The coach will not be able to access the platform anymore. This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex justify-end bg-gray-100 py-4 px-6">
            <button onClick={closeWindow} type="button" className="text-sm font-semibold leading-6 text-gray-500 mr-4 border border-gray-300 bg-white rounded-md px-5 py-2">
              Cancel
            </button>
            <button
              // onClick={handleSubmit}
              type="submit"
              className="rounded-md bg-red-600 px-5  py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default DeleteCoach