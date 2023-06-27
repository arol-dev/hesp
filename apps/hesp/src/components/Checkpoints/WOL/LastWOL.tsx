import { ReactNode, useState } from "react";
import { IWOLcheckpoint, WOLTopic, WOLTopics } from "../../../../types";
import moment from "moment";

interface ILastWOLProps {
  lastWOLCheckpoint: IWOLcheckpoint;
  children: ReactNode;
}

function LastWOL({ lastWOLCheckpoint }: ILastWOLProps) {
  const [WOLformdata, setWOLformdata] = useState<WOLTopics>([
    {
      name: "Health",
      body: "health",
      value: lastWOLCheckpoint.health,
      feel: lastWOLCheckpoint.healthFeel,
      improve: lastWOLCheckpoint.healthImprove,
    },
    {
      name: "Career / Work",
      body: "career",
      value: lastWOLCheckpoint.work,
      feel: lastWOLCheckpoint.workFeel,
      improve: lastWOLCheckpoint.workImprove,
    },
    {
      name: "Finances",
      body: "finances",
      value: lastWOLCheckpoint.finances,
      feel: lastWOLCheckpoint.financesthFeel,
      improve: lastWOLCheckpoint.financesthImprove,
    },
    {
      name: "Environment",
      body: "environment",
      value: lastWOLCheckpoint.environment,
      feel: lastWOLCheckpoint.environmentFeel,
      improve: lastWOLCheckpoint.environmentImprove,
    },
    {
      name: "Love",
      body: "love",
      value: lastWOLCheckpoint.love,
      feel: lastWOLCheckpoint.loveFeel,
      improve: lastWOLCheckpoint.loveImprove,
    },
    {
      name: "Family and Friends",
      body: "familyfriends",
      value: lastWOLCheckpoint.familyFriends,
      feel: lastWOLCheckpoint.familyFriendsFeel,
      improve: lastWOLCheckpoint.familyFriendsImprove,
    },
    {
      name: "Personal Development",
      body: "personaldevelopment",
      value: lastWOLCheckpoint.personalDevelopment,
      feel: lastWOLCheckpoint.personalDevelopmentFeel,
      improve: lastWOLCheckpoint.personalDevelopmentImprove,
    },
    {
      name: "Fun",
      body: "fun",
      value: lastWOLCheckpoint.fun,
      feel: lastWOLCheckpoint.funFeel,
      improve: lastWOLCheckpoint.funImprove,
    },
  ]);

  const lastCheckpointDate = lastWOLCheckpoint?.createdAt;
  const dateToShow = moment(lastCheckpointDate).format("ll");

  return (
    <div className="pl-5 pr-5">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Last WOL checkpoint
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{dateToShow}</p>
          </div>
          {WOLformdata.map((topic: WOLTopic) => (
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 xl:grid-cols-4">
                  <dt className="text-sm font-medium  text-gray-500">
                    {topic.name}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900  sm:mt-0">
                    <div className="flex items-center">
                      <div className="h-2 rounded-full bg-gray-300 w-40">
                        <div
                          className={` h-full rounded-full ${
                            topic.value >= 7
                              ? "bg-gradient-to-r from-green-400 to-green-600"
                              : topic.value >= 4
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-red-400 to-red-600"
                          }`}
                          style={{ width: `${(topic.value / 9) * 100}%` }}
                        ></div>
                      </div>
                      <div className="ml-5">{topic.value}</div>
                    </div>
                  </dd>
                  <dd className="mt-1 text-sm text-gray-900  sm:mt-0">
                    {topic.feel}
                  </dd>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                    {topic.improve}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default LastWOL;
