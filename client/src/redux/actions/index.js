import axios from "axios";
import {
  GET_TRENDING_COINS,
  GET_HISTORY_CHART,
  GET_ALL_COINS,
  GET_COIN_DETAIL,
  GET_COIN_BY_NAME,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ORDER_QUOTES,
  ORDER_RANKS,
  ORDER_CHANGE_PERCENTAGE,
  POST_USER,
  FILTER_FAVORITE,
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

export function getCoinByName(id) {
  return async function (dispatch) {
    let json = await axios.get(
      `http://localhost:3001/coins/allcoins?name=${id}`
    );
    return dispatch({
      type: GET_COIN_BY_NAME,
      payload: json.data,
    });
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

export function addFavorite(coin) {
  return {
    type: ADD_FAVORITE,
    payload: coin,
  };
}

export function removeFavorite(coin) {
  return {
    type: REMOVE_FAVORITE,
    payload: coin,
  };
}

export function filterFavorites(payload) {
  return {
    type: FILTER_FAVORITE,
    payload: payload,
  };
}

export function orderQUOTES(payload) {
  return {
    type: ORDER_QUOTES,
    payload: payload,
  };
}

export function orderRANKS(payload) {
  return {
    type: ORDER_RANKS,
    payload: payload,
  };
}

export function orderChangePercentage(payload) {
  return {
    type: ORDER_CHANGE_PERCENTAGE,
    payload: payload,
  };
}

export const postUser = (user) => {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/users/`, user);

    return response;
  };
};
