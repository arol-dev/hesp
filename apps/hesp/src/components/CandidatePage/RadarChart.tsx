import { Radar } from "react-chartjs-2";
import {
  Chart as chartjs,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  ChartDataset,
  ChartDataCustomTypesPerDataset,
  ChartDatasetProperties,
  ChartData,
  RadarController,
  RadarControllerChartOptions,
} from "chart.js";
import { ITrainee, IWOLcheckpoint, IPDCcheckpoint } from "../../../types";
import { PDCcheckpoint } from "@prisma/client";
import { IUser } from "../../../types";

interface ChartProps {
  person: ITrainee;
  WOLs: IWOLcheckpoint[];
  PDs: IPDCcheckpoint[];
}

function Chart({ person, PDs, WOLs }: ChartProps) {
  chartjs.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler
  );

  let dataPD: any = {};
  let dataWOL: any = {};

  let optionsPD = {};
  let optionsWOL = {};

  if (person.PDCcheckpoint.length > 0 && person.WOLcheckpoint.length > 0) {
    let firstPD = person.PDCcheckpoint[0];
    let firstWOL = person.WOLcheckpoint[0];
    if (
      person.PDCcheckpoint.length === 1 &&
      person.WOLcheckpoint.length === 1
    ) {
      dataPD = {
        labels: [
          "Trust",
          "Follow",
          "Task Retention",
          "Plan Commitment",
          "CV",
          "Interviews",
          "Advancement",
        ],
        datasets: [
          {
            label: "First Checkpoint",
            data: [
              firstPD.trust,
              firstPD.willFollow,
              firstPD.retention,
              firstPD.commitment,
              firstPD.cv,
              firstPD.readyForInterviews,
              firstPD.advancement,
            ],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      };

      dataWOL = {
        labels: [
          "Health",
          "Career / Work",
          "Finances",
          "Environment",
          "Love",
          "Family and Friends",
          "Personal Development",
          "Fun",
        ],
        datasets: [
          {
            label: "First Checkpoint",
            data: [
              firstWOL.health,
              firstWOL.work,
              firstWOL.finances,
              firstWOL.environment,
              firstWOL.love,
              firstWOL.familyFriends,
              firstWOL.personalDevelopment,
              firstWOL.fun,
            ],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      };

      optionsPD = {
        stroke: {
          show: true,
          width: 2,
          colors: [],
          dashArray: 0,
        },
        fill: {
          opacity: 0.5,
          colors: [],
        },
        scales: {
          r: {
            ticks: {
              min: 1,
              max: 5,
              stepSize: 1,
              showLabelBackdrop: false,
              backdropColor: "rgba(203, 197, 11, 1)",
            },

            angleLines: {
              lineWidth: 1,
            },
            gridLines: {
              color: "black",
              circular: true,
            },
            polygon: {
              sides: 7,
            },
          },
        },
      };

      optionsWOL = {
        stroke: {
          show: true,
          width: 2,
          colors: [],
          dashArray: 0,
        },
        fill: {
          opacit: 0.5,
          colors: [],
        },
        scales: {
          r: {
            ticks: {
              min: 1,
              max: 9,
              stepSize: 1,
              showLabelBackdrop: false,
              backdropColor: "rgba(203, 197, 11, 1)",
            },

            angleLines: {
              lineWidth: 1,
            },
            gridLines: {
              color: "black",
              circular: true,
            },
            polygon: {
              sides: 7,
            },
          },
        },
      };
    } else {
      const lastPD = person.PDCcheckpoint[person.PDCcheckpoint.length - 1];
      const lastWOL = person.WOLcheckpoint[person.WOLcheckpoint.length - 1];

      dataPD = {
        labels: [
          "Trust",
          "Follow",
          "Task Retention",
          "Plan Commitment",
          "CV",
          "Interviews",
          "Advancement",
        ],
        datasets: [
          {
            label: "First Checkpoint",
            data: [
              firstPD.trust,
              firstPD.willFollow,
              firstPD.retention,
              firstPD.commitment,
              firstPD.cv,
              firstPD.readyForInterviews,
              firstPD.advancement,
            ],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: "Last Checkpoint",
            data: [
              lastPD.trust,
              lastPD.willFollow,
              lastPD.retention,
              lastPD.commitment,
              lastPD.cv,
              lastPD.readyForInterviews,
              lastPD.advancement,
            ],

            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
          },
        ],
      };

      dataWOL = {
        labels: [
          "Health",
          "Career / Work",
          "Finances",
          "Environment",
          "Love",
          "Family and Friends",
          "Personal Development",
          "Fun",
        ],
        datasets: [
          {
            label: "First Checkpoint",
            data: [
              firstWOL.health,
              firstWOL.work,
              firstWOL.finances,
              firstWOL.environment,
              firstWOL.love,
              firstWOL.familyFriends,
              firstWOL.personalDevelopment,
              firstWOL.fun,
            ],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: "Last Checkpoint",
            data: [
              lastWOL.health,
              lastWOL.work,
              lastWOL.finances,
              lastWOL.environment,
              lastWOL.love,
              lastWOL.familyFriends,
              lastWOL.personalDevelopment,
              lastWOL.fun,
            ],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
          },
        ],
      };

      optionsPD = {
        stroke: {
          show: true,
          width: 2,
          colors: [],
          dashArray: 0,
        },
        fill: {
          opacity: 0.5,
          colors: [],
        },
        scales: {
          r: {
            ticks: {
              min: 1,
              max: 5,
              stepSize: 1,
              showLabelBackdrop: false,
              backdropColor: "rgba(203, 197, 11, 1)",
            },

            angleLines: {
              lineWidth: 1,
            },
            gridLines: {
              color: "black",
              circular: true,
            },
            polygon: {
              sides: 7,
            },
          },
        },
      };

      optionsWOL = {
        stroke: {
          show: true,
          width: 2,
          colors: [],
          dashArray: 0,
        },
        fill: {
          opacit: 0.5,
          colors: [],
        },
        scales: {
          r: {
            ticks: {
              min: 1,
              max: 9,
              stepSize: 1,
              showLabelBackdrop: false,
              backdropColor: "rgba(203, 197, 11, 1)",
            },

            angleLines: {
              lineWidth: 1,
            },
            gridLines: {
              color: "black",
              circular: true,
            },
            polygon: {
              sides: 7,
            },
          },
        },
      };
    }
  }

  return person.PDCcheckpoint.length === 0 &&
    person.WOLcheckpoint.length === 0 ? (
    <> Nothing to show</>
  ) : (
    <>
      <div className="bg-white flex w-full justify-center ">

        <div className=" flex flex-col p-10  w-1/3 ">
          <h3 className="flex justify-center px-5 py-5 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            PD CHECKPOINTS
          </h3>
          {Object.keys(dataPD).length !== 0 && (
            <Radar data={dataPD} options={optionsPD} />
          )}

        </div>

        <div className="  flex flex-col p-10  w-1/3 ">
          <h3 className="flex justify-center px-5 py-5 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            WOL CHECKPOINTS
          </h3>
          {Object.keys(dataWOL).length !== 0 && (
            <Radar data={dataWOL} options={optionsWOL} />
          )}
        </div>
      </div>

    </>
  );
}

export default Chart;
