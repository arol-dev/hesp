import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { IUser } from "../../../types";
import { useState } from "react";
import { useRouter } from "next/router";
import { toBase64 } from "../../../lib/helperFuntions/toBase64";

interface CoachProfilePageProps {
  person: IUser;
  jwt: IUser;
}

function CoachProfilePage({ person, jwt }: CoachProfilePageProps) {
  const router = useRouter();

  const isAllowedToEdit = jwt.role === "ADMIN" || jwt.id === person.id;

  const [selectedPicFile, setSelectedPicFile] = useState<File | null>(null);
  const [picpreview, setPicPreview] = useState<string | undefined>(
    person.picture
  );

  const [formData, setFormData] = useState({
    id: person.id,
    firstName: person.firstName,
    lastName: person.lastName,
    email: person.email,
    picture: person.picture,
  });

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFileInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const base64File = await toBase64(file);

    setSelectedPicFile(file);
    setPicPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formDataForFetch = new FormData();
    formDataForFetch.append("id", formData.id.toString());
    formDataForFetch.append("firstName", formData.firstName);
    formDataForFetch.append("lastName", formData.lastName);
    formDataForFetch.append("email", formData.email);

    if (selectedPicFile) {
      formDataForFetch.append("picture", selectedPicFile);
    } else {
      formDataForFetch.append("picture", formData.picture);
    }

    const response = await fetch("/api/staff/updateCoach", {
      method: "PUT",

      body: formDataForFetch,
    });

    const result = await response.json();

    if (response.ok) {
      window.alert("Personal information of the coach updated successfully");
      router.push(`/team`);
    } else {
      console.error("Error deleting coach:", result);
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="sm:flex-auto"></div>
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will help your HEs and teammates indentify you
                better.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      {isAllowedToEdit ? (
                        <textarea
                          onChange={(event) => handleInputChange(event)}
                          id="firstName"
                          name="firstName"
                          rows={1}
                          className="resize-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={person.firstName}
                        />
                      ) : (
                        <p>{person.firstName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Surname
                    </label>
                    <div className="mt-2">
                      {isAllowedToEdit ? (
                        <textarea
                          onChange={(event) => handleInputChange(event)}
                          id="lastName"
                          name="lastName"
                          rows={1}
                          className="resize-none first-letter:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={person.lastName}
                        />
                      ) : (
                        <p>{person.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      {isAllowedToEdit ? (
                        <textarea
                          onChange={(event) => handleInputChange(event)}
                          id="email"
                          name="email"
                          rows={1}
                          className=" resize-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={person.email}
                        />
                      ) : (
                        <p>{person.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      {!picpreview && !person.picture && !selectedPicFile ? (
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-300">
                          <PhotoIcon className="h-6 w-6 text-white" />
                        </div>
                      ) : (
                        <img
                          src={formData.picture ?? person.picture}
                          alt="Profile"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}
                      {isAllowedToEdit && (
                        <label
                          htmlFor="photoInput"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Change
                        </label>
                      )}
                      <input
                        type="file"
                        id="photoInput"
                        name="photo"
                        className="hidden"
                        accept="image/*"
                        onChange={(event) => handleFileInputChange(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {isAllowedToEdit && (
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachProfilePage;
