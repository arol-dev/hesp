import { useEffect, useState } from "react"

type SessionNotesProps = {
  onTopicsListChange: (list: any) => void;
};

type TopicProps = {
  id: number,
  edit: boolean,
  topic: string,
  objective: string,
  actions: string,
  notes: string,
  results: string,
  evaluation: string

}
function SessionNotes({ onTopicsListChange }: SessionNotesProps) {


  const [topicsList, setTopicsList] = useState<TopicProps[]>([{
    id: Date.now(),
    edit: true,
    topic: "",
    objective: "",
    actions: "",
    notes: "",
    results: "",
    evaluation: ""
  }])

  console.log(topicsList)


  useEffect(() => {
    onTopicsListChange(topicsList);
  }, [topicsList, onTopicsListChange]);





  const addTopic = () => {
    let last = topicsList.length - 1

    if (topicsList[last].topic === '' || topicsList[last].objective === '' || topicsList[last].actions === '' || topicsList[last].notes === '' || topicsList[last].results === '' || topicsList[last].evaluation === '') {
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
        results: "",
        evaluation: ""
      }

      setTopicsList([...topicsList, newTopic])
    }

  }

  const handleSubmit = async (topic: TopicProps, event: any) => {

    event.preventDefault();


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
          evaluation: topic.evaluation
        };
      }

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
    <div className="space-y-10 pl-5 pr-5 pb-10">
      <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
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
        <div className="px-4 sm:px-0 col-span-1">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Topics</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="col-span-2 ">
          {topicsList.map((topic) =>
            topic.edit === true ?
              <form onSubmit={() => handleSubmit(topic, event)} action="/api/PDnotes" method="post" className="mb-5 grid justify-self-end bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-4 sm:p-8">
                  <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Topic
                    </label>
                    <div className=" ">
                      <label htmlFor="topic">
                        <textarea
                          id="topic"
                          name="topic"
                          rows={1}
                          className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={topic.topic}
                          onChange={() => handleChange(event, topic)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Objective               </label>
                    <div className="">
                      <label htmlFor="objective" >
                        <textarea
                          id="objective"
                          name="objective"
                          rows={1}
                          className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={topic.objective}
                          onChange={() => handleChange(event, topic)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Actions
                    </label>
                    <div className="">
                      <label htmlFor="actions">
                        <textarea
                          id="actions"
                          name="actions"
                          rows={3}
                          className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={topic.actions}
                          onChange={() => handleChange(event, topic)}
                        />
                      </label>
                    </div>

                  </div>  <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Notes

                    </label>
                    <div className="">
                      <label htmlFor="notes">
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={topic.notes}
                          onChange={() => handleChange(event, topic)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Results
                    </label>
                    <div className="">
                      <label htmlFor="results">
                        <textarea
                          id="results"
                          name="results"
                          rows={3}
                          className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={topic.results}
                          onChange={() => handleChange(event, topic)}
                        />
                      </label>
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Evaluation
                      </label>
                      <div className="">
                        <label htmlFor="evaluation">
                          <textarea
                            id="evaluation"
                            name="evaluation"
                            rows={3}
                            className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={topic.evaluation}
                            onChange={() => handleChange(event, topic)}
                          />
                        </label>
                      </div>
                    </div>

                  </div>
                  <div className="flex items-start gap-x-6 border-gray-900/10 py-4  ">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save Topic
                    </button>
                  </div>  </div>
              </form> :
              <div className="grid justify-self-end bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl  mb-5">
                <div className="px-4 py-6 sm:p-8">
                  <div className="">
                    <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Topic
                      </label>
                      <div className="">
                        <label htmlFor="topic">
                          <div
                            id="topic"
                            className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          > {topic.topic} </div>
                        </label>
                      </div>

                    </div>
                    <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Objective               </label>

                      <div className="">
                        <label htmlFor="objective" >
                          <div
                            id="objective"

                            className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                          >
                            {topic.objective} </div>
                        </label>
                      </div>


                    </div>
                    <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Actions
                      </label>
                      <div className="">
                        <label htmlFor="actions">
                          <div
                            id="actions"


                            className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                          >
                            {topic.actions}</div>
                        </label>
                      </div>

                    </div>  <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Notes

                      </label>
                      <div className="">
                        <label htmlFor="notes">
                          <div
                            id="notes"


                            className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                          >
                            {topic.notes}</div>
                        </label>
                      </div>


                    </div>
                    <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Results

                      </label>
                      <div className="">
                        <label htmlFor="results">
                          <div
                            id="results"


                            className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            {topic.results}</div>
                        </label>
                      </div>
                    </div>

                    <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Evaluation

                      </label>
                      <div className="">
                        <label htmlFor="evaluation">
                          <div
                            id="evaluation"


                            className="block w-full mb-4 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            {topic.evaluation}</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-6 border-gray-900/10  py-4  ">

                    <button
                      onClick={() => handleEditClick(topic)}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
          )}</div>
      </div>

    </div >
  )
}

export default SessionNotes