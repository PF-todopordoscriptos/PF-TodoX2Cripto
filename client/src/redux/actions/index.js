import axios from "axios";
import { GET_TRENDING_COINS, GET_HISTORY_CHART } from "./actionTypes";

export function getTrendingCoins() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/coins/trending");
    return dispatch({
      type: GET_TRENDING_COINS,
      payload: json.data,
    });
  };
}
export function getHistoryChart(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/coins/chart/${id}`);
    return dispatch({
      type: GET_HISTORY_CHART,
      payload: json.data,
    });
  };
}
