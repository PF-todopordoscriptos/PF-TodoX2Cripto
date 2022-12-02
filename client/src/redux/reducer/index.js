import { GET_TRENDING_COINS, GET_ALL_COINS, GET_HISTORY_CHART, GET_COIN_BY_NAME } from "../actions/actionTypes";

const initialState = {
  allCoins: [],
  coinDetails: {},
  trendingCoins: [],
  historyChart: [],
  coin: [],
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
      console.log('payload '+action.payload)
      console.log(state.coin)
      return {
        ...state,
        coin: state.allCoins.filter((c) => c.name.toLowerCase() === action.payload.toLowerCase())
      };
      
    default:
      return state;
  }
}
export default rootReducer;
