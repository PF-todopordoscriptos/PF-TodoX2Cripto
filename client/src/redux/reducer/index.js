import { GET_TRENDING_COINS } from "../actions/actionTypes";

const initialState = {
  allCoins: [],
  coinDetails: {},
  trendingCoins: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDING_COINS:
      return {
        ...state,
        trendingCoins: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
