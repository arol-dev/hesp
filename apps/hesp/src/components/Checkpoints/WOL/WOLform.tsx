import { ReactEventHandler, useCallback, useEffect, useState } from "react";
import { WOLTopic, WOLTopics, WOLCheckpointProps } from "../../../../types";
import WOLTopicCard from "./WOLTopicCard";

function WOLForm({ onDataChange }: WOLCheckpointProps) {
  const [WOLformdata, setWOLformdata] = useState<WOLTopics>([
    {
      name: "Health",
      body: "health",
      value: 0,
      feel: "",
      improve: ""
    },
    {
      name: "Career / Work",
      body: "career",
      value: 0,
      feel: "",
      improve: ""
    },
    {
      name: "Finances",
      body: "finances",
      value: 0,
      feel: "",
      improve: ""
    },
    {
      name: "Environment",
      body: "environment",
      value: 0,
      feel: "",
      improve: ""
    },
    {
      name: "Love",
      body: "love",
      value: 0,
      feel: "",
      improve: ""
    }, {
      name: "Family and Friends",
      body: "familyfriends",
      value: 0,
      feel: "",
      improve: ""
    },
    {
      name: "Personal Development",
      body: "personaldevelopment",
      value: 0,
      feel: "",
      improve: ""
    },
    {
      name: "Fun",
      body: "fun",
      value: 0,
      feel: "",
      improve: ""
    }
  ])

  useEffect(() => {
    onDataChange(WOLformdata);
  }, [WOLformdata, onDataChange]);

  console.log('WOLformdata', WOLformdata)

  const handleRatingChange = useCallback((index: number, value: number) => {
    const updatedRatings = [...WOLformdata];
    updatedRatings[index].value = value;
    setWOLformdata(updatedRatings);
  }, [WOLformdata])

  const handleFeelChange = useCallback((index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newFormData = [...WOLformdata];
    newFormData[index].feel = event.target.value;
    setWOLformdata(newFormData);
  }, [WOLformdata])

  const handleImproveChange = useCallback((index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newFormData = [...WOLformdata];
    newFormData[index].improve = event.target.value;
    setWOLformdata(newFormData);
  }, [WOLformdata])

  return (
    <>
      {
        WOLformdata.map((topic: WOLTopic, index) => (
          <WOLTopicCard
            key={index}
            topic={topic}
            index={index}
            onRatingChange={handleRatingChange}
            onFeelChange={handleFeelChange}
            onImproveChange={handleImproveChange}
          />
        ))
      }
    </>
  )
}
export default WOLForm
