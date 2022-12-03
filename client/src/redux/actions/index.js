import axios from "axios";
import {
  GET_TRENDING_COINS,
  GET_HISTORY_CHART,
  GET_ALL_COINS,
  GET_COIN_DETAIL,
  GET_COIN_BY_NAME,
  ADD_FAVORITE,
  ORDER_QUOTES,
  ORDER_RANKS,
  ORDER_CHANGE_PERCENTAGE
} from "./actionTypes";

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

export function getHistoryChart(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/coins/chart/${id}`);
    return dispatch({
      type: GET_HISTORY_CHART,
      payload: json.data,
    });
  };
}

export function getCoinByName(payload) {
  return {
    type: GET_COIN_BY_NAME,
    payload,
  };
}
export function getCoinDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/coins/details/${id}`);
    return dispatch({
      type: GET_COIN_DETAIL,
      payload: json.data,
    });
  };
}

export function addFavorite(coin){
  return({
      type: ADD_FAVORITE,
      payload: coin
  })
}

export function orderQUOTES(payload){
  return{
      type: ORDER_QUOTES,
      payload: payload
  }
}

export function orderRANKS(payload){
  return{
      type: ORDER_RANKS,
      payload: payload
  }
}

export function orderChangePercentage(payload){
  return{
      type: ORDER_CHANGE_PERCENTAGE,
      payload: payload
  }
}