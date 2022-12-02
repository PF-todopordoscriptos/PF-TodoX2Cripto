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

const Chart = (props) => {
  const dispatch = useDispatch();
  const historyChart = useSelector((state) => state.historyChart);
  console.log(historyChart);

  useEffect(() => {
    dispatch(getHistoryChart(props.match.params.id));
  }, [dispatch, props]);

  const options = { ...historyOptions };

  return (
    <div>
      Chart
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
                  label: props.match.params.id,
                  data: historyChart.coinChartData.map((value) => value.y),
                  borderColor: "rgb(53, 162, 235)",
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

export default Chart;
