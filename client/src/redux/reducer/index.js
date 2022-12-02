import { GET_TRENDING_COINS, GET_ALL_COINS, GET_HISTORY_CHART } from "../actions/actionTypes";

const initialState = {
  allCoins: [],
  coinDetails: {},
  trendingCoins: [],
  historyChart: [],
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

    default:
      return state;
  }
}
export default rootReducer;
