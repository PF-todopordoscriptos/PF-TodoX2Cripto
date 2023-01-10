/*eslint-disable*/
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

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

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
const HistoryChart = (id, days) => {
  const dispatch = useDispatch();
  const historyChart = useSelector((state) => state.historyChart);
  console.log(id);

  useEffect(() => {
    dispatch(getHistoryChart(id.id, 7));
  }, [dispatch]);

  const options = { ...historyOptions };
  const [day, setDay] = useState({});

  const handleDays = (e) => {
    dispatch(getHistoryChart(id.id, e.target.value));
    setDay(e.target.value);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-standard-label">Days</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={day}
          onChange={handleDays}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
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
                  label: id.id,
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
