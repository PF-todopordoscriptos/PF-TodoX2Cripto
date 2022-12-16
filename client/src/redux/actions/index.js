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
  // POST_USER,
  FILTER_FAVORITE,
  CREATE_REVIEW,
  GET_REVIEW,
  GET_USER_INFO,
  UPDATE_USER_INFO,
  GET_TRENDING_NEWS,
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

export function getTrendingNews(){
  return async function(dispatch){
    let json = await axios.get("http://localhost:3001/coins/trendingNews");
    return dispatch({
      type: GET_TRENDING_NEWS,
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

export function getHistoryChart(id, days) {
  return async function (dispatch) {
    let json = await axios.get(
      `http://localhost:3001/coins/chart/${id}?days=${days}`
    );
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

export const postUserGoogle = (user) => {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/users/loginWithGoogle?google=true`, user);

    return response;
  };
};




export function createReview(review, id) {
  return async function (dispatch) {
    await axios
      .post(`http://localhost:3001/coins/reviews/${id}`, review)
      .then((json) => {
        return dispatch({
          type: CREATE_REVIEW,
          payload: json.data,
        });
      });
  };
}

export function getReview(coinName) {
  return async function (dispatch) {
    let json = await axios.get(
      `http://localhost:3001/coins/reviews/${coinName}`
    );
    return dispatch({
      type: GET_REVIEW,
      payload: json.data,
    });
  };
}


export function getUserInfo(oneUser) {
  return async function (dispatch){
    let json = await axios.get(`http://localhost:3001/users/${oneUser}`);
    return dispatch ({
      type: GET_USER_INFO,
      payload: json.data
    })
  }
}

export function updateUserInfo(email, payload){
  return async function (dispatch){
    let json = await axios.put(`http://localhost:3001/users/${email}`,payload);
    console.log("update user")
    console.log(json.data)
    return dispatch ({
      type: UPDATE_USER_INFO,
      payload: json.data
    })
  }
}
