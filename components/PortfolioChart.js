import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const data = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ],

  datasets: [
    {
      fill: false,
      lineTension: 0.01,
      backgroundColor: '#00ff1a',
      borderColor: '#00ff1a',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: '0.0',
      borderJoinStyle: 'miter',
      pointBorderColor: '#00ff1a',
      pointBackgroundColor: '#00ff1a',
      pointBorderWidth: 1,
      pointBorderRadius: 5,
      pointHoverBackgroundColor: '#00ff1a',
      pointHoverBorderColor: '#00ff1a',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [34, 45, 44, 70, 85, 22, 59, 100, 95, 87],
    },
  ]
};

const config = {
  type: 'line',
  data: data,
};


const options = {
  plugins: {
    legend: {
      display: false,
    }
  }
}

import React from 'react'

const PortfolioChart = () => {
  return (
    <Line data={data} options={options} width={400} height={150} />
  )
}



export default PortfolioChart