import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import "tailwindcss/tailwind.css";
import { IUser } from "../../types";

const fetchPeople = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/staff/staff");
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
  }
};

const AssignPerson = () => {
  const [people, setPeople] = useState<IUser[]>([]);
  const [showSelect, setShowSelect] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<IUser | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const data = await fetchPeople();
    setPeople(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClick = () => {
    setShowSelect(!showSelect);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const foundPerson = people.find(
      (person) => `${person.firstName} ${person.lastName}` === selectedValue
    );
    setSelectedPerson(foundPerson || null);
  };

  const handleConfirmAssignment = async () => {
    if (selectedPerson) {
      console.log(
        `Assigned ${selectedPerson.firstName} ${selectedPerson.lastName} ${selectedPerson.id}`
      );

      // get the last part of the path
      const path = window.location.pathname;
      const id = path.split("/").pop();

      // send the data to the api
      const response = await fetch(`http://localhost:3000/api/he/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedPerson.id }),
      });

      if (response.ok) {
        setSuccessMessage(
          `Assigned ${selectedPerson.firstName} ${selectedPerson.lastName} successfully.`
        );
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        setSuccessMessage(
          `Error assigning ${selectedPerson.firstName} ${selectedPerson.lastName}.`
        );
      }

      console.log(await response.json());
    }

    setShowSelect(false);
  };

  return (
    <div className="flex-row gap-3 w-80 mb-4 mr-5 space-y-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Assign Coach
      </button>
      {showSelect && (
        <>
          <select
            className="block mt-1 bg-white border-gray-300 w-auto rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            defaultValue=""
            onChange={handleSelectChange}
          >
            <option value="" disabled hidden>
              Select a Coach to assign.
            </option>
            {people.map((person: IUser, index: number) => (
              <option
                key={index}
                value={`${person.firstName} ${person.lastName}`}
              >
                {`${person.firstName} ${person.lastName}`}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 4 rounded"
            onClick={handleConfirmAssignment}
          >
            Confirm Assignment
          </button>
        </>
      )}
      {successMessage && (
        <div className="mt-2 text-green-500">{successMessage}</div>
      )}
    </div>
  );
};

export default AssignPerson;
