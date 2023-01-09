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
  SET_THEME_MODE,
  CREATE_WARNING,
  GET_ALL_WARNINGS,
  CLEAR_ADMIN,
  ADD_TO_CART,
  COIN_COMMENT,
  POST_COMMENT,
  GET_ALL_COMMENTS,
  ADD_TO_CART_BACK,
  GET_USER_CART,
  CLEAR_CART,
  DELETE_COMMENT
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

export function getTrendingNews() {
  return async function (dispatch) {
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
    const response = await axios.post(
      `http://localhost:3001/users/loginWithGoogle?google=true`,
      user
    );

    return response;
  };
};

export function setThemeMode(payload) {
  return {
    type: SET_THEME_MODE,
    payload,
  };
}

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
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/users/${oneUser}`);
    return dispatch({
      type: GET_USER_INFO,
      payload: json.data,
    });
  };
}

export function updateUserInfo(email, payload) {
  return async function (dispatch) {
    let json = await axios.put(`http://localhost:3001/users/${email}`, payload);
    console.log("update user");
    console.log(json.data);
    return dispatch({
      type: UPDATE_USER_INFO,
      payload: json.data,
    });
  };
}

export function addCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}

export const addCartBack = (idUser, idCoin, quantity, price) => {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/users/addTransactionCart`, idUser, idCoin, quantity, price);
      return response;
  };
};
export const addTransactionCart = (idUser, idCoin, quantity, price) => {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/users/addTransactionCart`, idUser, idCoin, quantity, price);
      return response;
  };
};
export const addTransaction = (idUser, idCoin, quantity, price) => {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/users/addTransaction`, idUser, idCoin, quantity, price);
      return response;
  };
};

export const getCartUser = (idUser)=> {
  
  return async function (dispatch) {
    let json = await axios.get(
`http://localhost:3001/users/transactionCart/${idUser}`,
     
      );
      return dispatch({
        type: GET_USER_CART,
        payload: json.data
      })
  };
}
export const deleteCartUser = (idUser)=> {
  
  return async function (dispatch) {
    let json = await axios.delete(
`http://localhost:3001/users/finishTransactions/${idUser}`,
     
      );
      return dispatch({
        type: CLEAR_CART,
       
      })
  };
}


export function clearAdmin(payload) {
  return async function (dispatch) {
    return dispatch({
      type: CLEAR_ADMIN,
      payload,
    });
  };
}

export function getAllWarnings(){
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/warnings/allWarnings");
    return dispatch({
      type: GET_ALL_WARNINGS,
      payload: json.data,
    });
  };
}


export function createWarning(payload) {
  return async function () {
    let json = await axios.post(
      "http://localhost:3001/warnings/warnings",
      payload
    );
    return json;
  };
}

export function createComment(payload){
  return async function () {
    let json = await axios.post(
      "http://localhost:3001/comments/comment",
      payload
    );
    return json;
  };
}

export function getCoinComment(coin) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/comments/${coin}`);
    return dispatch({
      type: COIN_COMMENT,
      payload: json.data,
    });
  };
}

export function getAllComments(){
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/comments/allComments");
    return dispatch({
      type: GET_ALL_COMMENTS,
      payload: json.data,
    });
  };
}

export function deleteComment(id){
  return async function(){
    try{
        return await axios.delete(`http://localhost:3001/comments/${id}`)
    }catch(e){
        console.log(e.message)
    }
}
}
