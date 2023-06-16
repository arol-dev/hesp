import Navbar from "../Navbar";
import { useEffect, useState } from 'react';
import PDForm from './PD/PDform';
import WOLForm from './WOL/WOLform';
import SessionNotes from "./PD/Session Notes/SessionNotes";
import { useRouter } from "next/router";
import { Ratings, WOLTopics, NewCheckpointProps, SessiontNotes } from "../../../types";
import Breadcrumbs from "./NewCheckpointComponents/Breadcrumbs";
import { SaveButton, SwitchButton } from "./NewCheckpointComponents/Buttons";


function NewCheckpoint({ person, id, lastPDCheckpoint, lastWOLCheckpoint }: NewCheckpointProps) {
  const router = useRouter()

  const [pd, setPD] = useState(false)
  const [sessionNotes, setSessionNotes] = useState<SessiontNotes>([]);
  const [ratings, setRatings] = useState<Ratings>([]);
  const [WOLdata, setWOLdata] = useState<WOLTopics>([]);
  const [PDSaved, setPDSaved] = useState(false)
  const [WOLSaved, setWOLSaved] = useState(false)
  const [isPDFormValid, setIsPDFormValid] = useState(false)


  useEffect(() => {
    setIsPDFormValid(ratings.every((rating) => rating.value !== 0));
  }, [ratings]);

  useEffect(() => {
    setIsPDFormValid(WOLdata.every((chunk) => chunk.value !== 0));
  }, [WOLdata]);



  // WOL 

  const handleWOLDataChange = (data: WOLTopics) => {
    setWOLdata(data)
  }

  function handleSubmitWol(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const data = WOLdata.map(topic => ({
      [topic.body]: topic.value,
      [`${topic.body}Feel`]: topic.feel,
      [`${topic.body}Improve`]: topic.improve,
    }));

    const params = new URLSearchParams();
    params.append('userId', id.toString());


    data.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
    });
    fetch("/api/wol/createWOL", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => {
      if (response.ok) {
        window.alert("WOL checkpoint is added");
      } else {
        window.alert("Checkpoint can't be submitted")
      }
      setWOLSaved(!WOLSaved)
      router.push(`/candidates/${id}/`)

    });
  }




  //PD  
  const handleSessionNotesChange = (notes: SessiontNotes) => {
    setSessionNotes(notes);
  };

  const handleRatingChange = (ratings: Ratings) => {
    setRatings(ratings);
  }

  function handleSubmitPD(event: any) {
    event.preventDefault();
    if (isPDFormValid) {

      const params = new URLSearchParams();

      params.append('userId', id.toString());

      ratings.forEach((rating) => {
        params.append(rating.body, rating.value.toString());
      });
      const sessionNotesString = JSON.stringify(sessionNotes);
      params.append('sessionNotes', sessionNotesString);



      fetch("/api/pdc/createPD", {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",

        },
      }).then((response) => {
        if (response.ok) {
          window.alert("Checkpoint added");
        } else {
          window.alert("Checkpoint can't be submitted")
        }
      });
      setPDSaved(!PDSaved)
      router.push(`/candidates/${id}/checkpoint`)
    } else {
      window.alert('Please answer all the questions to submit the form')
    }
  }

  return (
    <div>
      <Navbar headerText={"HESP Program"}></Navbar>
      <Breadcrumbs id={id} person={person}></Breadcrumbs>
      {pd ? (
        <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              New Professional Development Checkpoint
            </h3>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <SwitchButton dataCy="switch-button" onClick={() => setPD(!pd)} text="Switch to WOL"></SwitchButton>
            {lastPDCheckpoint ? <></> : <SaveButton dataCy="pd-button" onClick={(event) => { handleSubmitPD(event) }} text="Save" ></SaveButton>}
          </div>
        </div>
      ) :
        <div className="lg:flex lg:items-center lg:justify-between pl-5 pr-5 pb-10">
          <div className="min-w-0 flex-1 pb-8">
            <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              New WOL Checkpoint
            </h3>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <SwitchButton dataCy="switch-button" onClick={() => setPD(!pd)} text=" Switch to Professional Development"></SwitchButton>
            {lastWOLCheckpoint ? <></> : <SaveButton dataCy="wol-button" onClick={(event) => { handleSubmitWol(event) }} text="Save" ></SaveButton>}
          </div>
        </div>
      }

      {
        pd ? <>
          <PDForm PDSaved={PDSaved} lastPDCheckpoint={lastPDCheckpoint} onRatingChange={handleRatingChange} />
          <SessionNotes PDSaved={PDSaved} lastPDCheckpoint={lastPDCheckpoint} onSessionNotesChange={handleSessionNotesChange} ></SessionNotes>
          {lastPDCheckpoint ? <></> : <SaveButton dataCy="pd-button" onClick={(event) => { handleSubmitPD(event) }} text="Save" ></SaveButton>}
        </>
          : <>
            <WOLForm lastWOLCheckpoint={lastWOLCheckpoint} WOLSaved={WOLSaved} onDataChange={handleWOLDataChange}></WOLForm>
            {lastWOLCheckpoint ? <></> : <SaveButton dataCy="wol-button" onClick={(event) => { handleSubmitWol(event) }} text="Save" ></SaveButton>}
          </>
      }
    </div >
  )

}

export default NewCheckpoint;
