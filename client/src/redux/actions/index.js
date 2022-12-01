import axios from "axios";
import { GET_TRENDING_COINS } from "./actionTypes";

export function getTrendingCoins() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/coins/trending");
    return dispatch({
      type: GET_TRENDING_COINS,
      payload: json.data,
    });
  };
}
export function getAllCoins() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/coins/allcoins");
    return dispatch({
      type: GET_ALL_COINS,
      payload: json.data,
    });
  };
}
