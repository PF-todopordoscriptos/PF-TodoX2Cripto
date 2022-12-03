import {
  GET_TRENDING_COINS,
  GET_ALL_COINS,
  GET_HISTORY_CHART,
  GET_COIN_DETAIL,
  GET_COIN_BY_NAME,
  ADD_FAVORITE
} from "../actions/actionTypes";

const initialState = {
  allCoins: [],
  coinDetails: {},
  trendingCoins: [],
  historyChart: [],
  coin: [],
  favoriteCoins: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDING_COINS:
      return {
        ...state,
        trendingCoins: action.payload,
      };
    case GET_ALL_COINS:
      return {
        ...state,
        allCoins: action.payload,
      };
    case GET_HISTORY_CHART:
      return {
        ...state,
        historyChart: action.payload,
      };

    case GET_COIN_BY_NAME:
      console.log("payload " + action.payload);
      console.log(state.coin);
      return {
        ...state,
        allCoins: action.payload
      };

    case GET_COIN_DETAIL:
      return {
        ...state,
        coinDetails: action.payload,
      };

    case ADD_FAVORITE:
      return{
        ...state,
        favoriteCoins: state.favoriteCoins.concat(action.payload)
      }

    default:
      return state;
  }
}
export default rootReducer;
