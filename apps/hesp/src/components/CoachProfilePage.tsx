import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { IUser } from '../../types'
import { useState } from 'react';

interface CoachProfilePageProps {
  person: IUser
}

function CoachProfilePage({ person }: CoachProfilePageProps) {

  const [formData, setFormData] = useState({
    firstName: person.firstName,
    lastName: person.lastName,
    email: person.email,
  })
  console.log('form data', formData)


  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will help your HEs and teammates indentify you better.
              </p>
            </div>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-2">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="mt-2">
                      <textarea
                        onChange={handleInputChange}
                        id="firstName"
                        name="firstName"
                        rows={1}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={person.firstName}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                      Surname
                    </label>
                    <div className="mt-2">
                      <textarea
                        onChange={handleInputChange}
                        id="lastName"
                        name="lastName"
                        rows={1}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={person.lastName}
                      />
                    </div>
                  </div>


                  <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-2">
                      <textarea
                        onChange={handleInputChange}
                        id="email"
                        name="email"
                        rows={1}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={person.email}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                      Cover photo
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
        </div>
      </div>
    </div>

  )


}

export default CoachProfilePage




