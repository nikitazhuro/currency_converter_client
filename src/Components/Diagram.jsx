import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

import { useCreateDiagram } from '../Hooks/useCreateADiagram';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function Chart({ currencyList, currency }) {
  const diagramCreator = useCreateDiagram(currencyList, currency);

  return (
    <Line
      type="line"
      width={160}
      height={60}
      data={diagramCreator}
    />
  );
}

export default Chart;
