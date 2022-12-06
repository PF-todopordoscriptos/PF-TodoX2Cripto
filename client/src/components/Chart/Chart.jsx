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
import { Line } from "react-chartjs-2";
import moment from "moment";
import { historyOptions } from "./ChartOptions";

import style from "./Chart.module.css"

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
const HistoryChart = (id) => {
  const dispatch = useDispatch();
  const historyChart = useSelector((state) => state.historyChart);
  console.log(id);

  useEffect(() => {
    dispatch(getHistoryChart(id.id));
  }, [dispatch, id]);

  const options = { ...historyOptions };

  return (
    <div>
      <div>
        {Object.keys(historyChart).length > 0 ? (
          <Line
            options={options}
            data={{
              labels: historyChart.coinChartData.map((value) =>
                moment(value.x).format("MMM-DD")
              ),
              datasets: [
                {
                  fill: true,
                  label: id,
                  data: historyChart.coinChartData.map((value) => value.y),
                  borderColor: "purple",
                },
              ],
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HistoryChart;
