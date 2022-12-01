import { GET_HISTORY_CHART, GET_TRENDING_COINS } from "../actions/actionTypes";

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
