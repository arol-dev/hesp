import { MailIcon } from '@heroicons/react/solid';
import { useState } from 'react';


interface AddCoachProps {
  closeForm: () => void
  showForm: () => void
}

function AddCoach({ closeForm, showForm }: AddCoachProps) {
  if (!showForm) {
    return null;
  }



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "STAFF",
    email: "",
    password: "12345"
  })


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }



  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/form-createCoach", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Form submitted successfully:', result);
      closeForm();
      window.location.reload()
    } else {
      console.error('Error submitting form:', result);
    }
  }



  return (
    <form>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-xl">
            <div className="space-y-12 px-6 py-4">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleInputChange}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Surname
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        onChange={handleInputChange}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <MailIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="email"
                          name="email"
                          onChange={handleInputChange}
                          type="email"
                          autoComplete="email"
                          className="block w-full pl-8 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="frodo.baggins@thefellowship.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 px-6 py-4 flex items-center justify-end gap-x-6">
              <button onClick={closeForm} type="button" className="text-sm font-semibold leading-6 text-gray">

                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form >
  )
}

export default AddCoach