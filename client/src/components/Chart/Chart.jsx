import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { getHistoryChart } from "../../redux/actions";
//import { Line } from "react-chartjs-2";

const Chart = () => {
  const dispatch = useDispatch();
  const historyChart = useSelector((state) => state.historyChart);

  useEffect(() => {
    dispatch(getHistoryChart());
  }, [dispatch]);
  console.log(historyChart);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  return (
    <div>
      Chart
      {/* <Line /> */}
    </div>
  );
};

export default Chart;
