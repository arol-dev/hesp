import { useState } from "react";

type Rating = {
  name: string;
  body: string,
  description: string;
  value: number;
};

 

type TopicProps = {
  id: number,
  edit: boolean,
  topic: string,
  objective: string,
  actions: string,
  notes: string,
  results: string

}

 
type PDFormProps = {
  ratings: Rating[];
  onRatingChange: (index: number, value: number) => void;
};

function PDForm({ ratings, onRatingChange }: PDFormProps) {
  const [topics, setTopics] = useState(1);

 

  function handleRatingChange(index: number, value: number) {
    onRatingChange(index, value);
  }
 
  function SessionNotes() {
    const [topicsList, setTopicsList] = useState<TopicProps[]>([{
      id: Date.now(),
      edit: true,
      topic: "",
      objective: "",
      actions: "",
      notes: "",
      results: ""
    }])

    console.log(topicsList)







    const addTopic = () => {
      let last = topicsList.length - 1

      if (topicsList[last].topic === '') {
        window.alert("Please save the previous topic before adding a new one")
      }
      else {
        const newTopic = {
          id: Date.now(),
          edit: true,
          topic: "",
          objective: "",
          actions: "",
          notes: "",
          results: ""
        }

        setTopicsList([...topicsList, newTopic])
      }

    }



    // const handleSubmit = async (event) => {
    //   event.preventDefault();

    //   const params = new URLSearchParams(formValues);


    //   fetch("/api/PDnotes", {
    //     method: "POST",
    //     body: params,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(response => {
    //     if (response.ok) {
    //       window.alert("Checkpoint added")
    //     } else {
    //       // handle error
    //     }
    //   });
    // }



    const handleSubmit = async (topic: TopicProps, event: any) => {

      event.preventDefault();
      console.log('save button is clicked')
      console.log('id', topic.id)
      console.log('this is the list', topicsList)

      const updatedTopicsList = topicsList.map((note) => {
        if (note.id === topic.id) {
          return {
            ...note,
            edit: !topic.edit,
            topic: topic.topic,
            objective: topic.objective,
            actions: topic.actions,
            notes: topic.notes,
            results: topic.results,
          };
        }
        console.log('note', note)
        return note;
      });

      setTopicsList(updatedTopicsList)

    }





    const handleChange = (event: any, topic: TopicProps) => {
      setTopicsList((prevTopicsList) =>
        prevTopicsList.map((note) => {
          if (note.id === topic.id) {
            return {
              ...note,
              [event.target.name]: event.target.value,
            };
          }
          return note;
        })
      );
    };








    const handleEditClick = async (topic: TopicProps) => {
      console.log('button edit is clicked')

      const updatedTopicsList = topicsList.map((note) => {
        if (note.id === topic.id) {
          return {
            ...note,
            edit: !topic.edit,
          };
        }
        return note;
      });

      setTopicsList(updatedTopicsList)




    }
    return (
      <div className="space-y-10 divide-y divide-gray-900/10 pl-5 pr-5 pb-10">
        <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10" >
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Session Notes</h3>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="sm:ml-3">
              <button onClick={addTopic} type="submit" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                + Add Topic
              </button>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Topics
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.           </p>
          </div>
          {topicsList.map((topic) =>
            topic.edit === true ?
              <form onSubmit={() => handleSubmit(topic, event)} action="/api/PDnotes" method="post" className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Topic
                      </label>
                      <div className="mt-2">
                        <label htmlFor="topic">
                          <textarea
                            id="topic"
                            name="topic"
                            rows={1}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={topic.topic}
                            onChange={() => handleChange(event, topic)}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Objective               </label>
                      <div className="mt-2">
                        <label htmlFor="objective" >
                          <textarea
                            id="objective"
                            name="objective"
                            rows={1}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={topic.objective}
                            onChange={() => handleChange(event, topic)}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Actions
                      </label>
                      <div className="mt-2">
                        <label htmlFor="actions">
                          <textarea
                            id="actions"
                            name="actions"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={topic.actions}
                            onChange={() => handleChange(event, topic)}
                          />
                        </label>
                      </div>

                    </div>  <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Notes

                      </label>
                      <div className="mt-2">
                        <label htmlFor="notes">
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={topic.notes}
                            onChange={() => handleChange(event, topic)}
                          />
                        </label>
                      </div>
                    </div>  <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Results

                      </label>
                      <div className="mt-2">
                        <label htmlFor="results">
                          <textarea
                            id="results"
                            name="results"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={topic.results}
                            onChange={() => handleChange(event, topic)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form> : <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Topic
                      </label>
                      <div className="mt-2">
                        <label htmlFor="topic">
                          <div
                            id="topic"
                            className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          > {topic.topic} </div>
                        </label>
                      </div>

                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Objective               </label>

                      <div className="mt-2">
                        <label htmlFor="objective" >
                          <div
                            id="objective"

                            className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                          >
                            {topic.objective} </div>
                        </label>
                      </div>


                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Actions
                      </label>
                      <div className="mt-2">
                        <label htmlFor="actions">
                          <div
                            id="actions"


                            className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                          >
                            {topic.actions}</div>
                        </label>
                      </div>

                    </div>  <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Notes

                      </label>
                      <div className="mt-2">
                        <label htmlFor="notes">
                          <div
                            id="notes"


                            className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                          >
                            {topic.notes}</div>
                        </label>
                      </div>


                    </div>  <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Results

                      </label>
                      <div className="mt-2">
                        <label htmlFor="results">
                          <div
                            id="results"


                            className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            {topic.results}</div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">

                  <button
                    onClick={() => handleEditClick(topic)}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
          )}
        </div>

      </div>
    )
 
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
              <div className="h-1 relative max-w-screen-md mx-auto">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1/6 w-2/4 bg-gray-300 rounded-full "
                  >
                    <div
                      className={`h-full rounded-full ${
                        rating.value >= 4
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : rating.value >= 3
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                          : "bg-gradient-to-r from-red-400 to-red-600"
                      }`}
                      style={{ width: `${(rating.value / 5) * 100}%` }}
                    ></div>
                  </div>
                ))}
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
                                className={`${
                                  rating.value === number
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
 

      <SessionNotes></SessionNotes>
    </div >
  )

}

export default PDForm;

