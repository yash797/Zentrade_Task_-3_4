import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend
);

const options = {
  indexAxis: 'y',

  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top',
    // },
    title: {
      display: true,
      text: 'Revenue by Job Location',
    },
  },
};

const labels = ['Everett', 'Seattle', 'Mumbai', 'Pune', 'London', 'Bothell'];

const data = {
  labels,
  datasets: [
    {
      label: 'Revenue',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const RevenueCharts = () => {
  return <Bar options={options} data={data} />;
};

export default RevenueCharts;
