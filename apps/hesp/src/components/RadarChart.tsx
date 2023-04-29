import { Radar } from "react-chartjs-2";
import {
  Chart as chartjs,
  LineElement, PointElement, Tooltip, Legend, RadialLinearScale, Filler
} from "chart.js"
import { DeepPartial } from "utility-types";


function Chart({ person, PDs, WOLs }) {

  chartjs.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale, Filler)



  let firstPD = PDs[0]
  let lastPD = PDs[PDs.length - 1]


  let firstWOL = WOLs[0]
  let lastWOL = WOLs[WOLs.length - 1]

  const dataPD = {
    labels: [
      'Trust',
      'Follow',
      'Task Retention',
      'Plan Commitment',
      'CV',
      'Interviews',
      'Advancement'
    ],
    datasets: [{
      label: 'First Checkpoint',
      data: [firstPD.trust, firstPD.willFollow, firstPD.retention, firstPD.commitment, firstPD.cv, firstPD.readyForInterviews, firstPD.advancement],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Last Checkpoint',
      data: [lastPD.trust, lastPD.willFollow, lastPD.retention, lastPD.commitment, lastPD.cv, lastPD.readyForInterviews, lastPD.advancement],

      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    },
    ]
  };

  const dataWOL = {
    labels: [
      'Health',
      'Career / Work',
      'Finances',
      'Environment',
      'Love',
      'Family and Friends',
      'Personal Development',
      'Fun'
    ],
    datasets: [{
      label: 'First Checkpoint',
      data: [firstWOL.health, firstWOL.work, firstWOL.finances, firstWOL.environment, firstWOL.love, firstWOL.familyFriends, firstWOL.personalDevelopment, firstWOL.fun],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Last Checkpoint',
      data: [lastWOL.health, lastWOL.work, lastWOL.finances, lastWOL.environment, lastWOL.love, lastWOL.familyFriends, lastWOL.personalDevelopment, lastWOL.fun],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    },
    ]
  };


  const optionsPD = {
    stroke: {
      show: true,
      width: 2,
      colors: [],
      dashArray: 0
    },
    fill: {
      opacity: 0.5,
      colors: []
    },
    scales: {
      r: {
        ticks: {
          min: 1,
          max: 5,
          stepSize: 1,
          showLabelBackdrop: false,
          backdropColor: "rgba(203, 197, 11, 1)"
        },

        angleLines: {
          lineWidth: 1
        },
        gridLines: {
          color: "black",
          circular: true,

        },
        polygon: {
          sides: 7
        }
      }
    }
  };

  const optionsWOL = {
    stroke: {
      show: true,
      width: 2,
      colors: [],
      dashArray: 0
    },
    fill: {
      opacity: 0.5,
      colors: []
    },
    scales: {
      r: {
        ticks: {
          min: 1,
          max: 9,
          stepSize: 1,
          showLabelBackdrop: false,
          backdropColor: "rgba(203, 197, 11, 1)"
        },

        angleLines: {
          lineWidth: 1
        },
        gridLines: {
          color: "black",
          circular: true,

        },
        polygon: {
          sides: 7
        }
      }
    }
  };





  return (
    <>
      <div>
        <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          PD CHECKPOINTS
        </h3>

        <Radar data={dataPD} options={optionsPD} ></Radar>

      </div>

      <div>
        <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          WOL CHECKPOINTS
        </h3>

        <Radar data={dataWOL} options={optionsWOL} ></Radar>

      </div>
    </>

  )

}

export default Chart