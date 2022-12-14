import {
  GET_TRENDING_COINS,
  GET_ALL_COINS,
  GET_HISTORY_CHART,
  GET_COIN_DETAIL,
  GET_COIN_BY_NAME,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ORDER_QUOTES,
  ORDER_RANKS,
  ORDER_CHANGE_PERCENTAGE,
  POST_USER,
  FILTER_FAVORITE,
  // CREATE_REVIEW,
  GET_REVIEW,
  GET_USER_INFO,
  UPDATE_USER_INFO,
  GET_TRENDING_NEWS
} from "../actions/actionTypes";

const initialState = {
  allCoins: [],
  noFilter: [],
  coinDetails: {},
  trendingCoins: [],
  trendingNews: [],
  historyChart: [],
  favoriteCoins: [],
  reviews: [],
  userInfo: [],
  user: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDING_COINS:
      return {
        ...state,
        trendingCoins: action.payload,
      };
    case GET_TRENDING_NEWS:
      return{
        ...state,
        trendingNews: action.payload,
      }
    case GET_ALL_COINS:
      return {
        ...state,
        allCoins: action.payload,
        noFilter: action.payload,
      };
    case GET_HISTORY_CHART:
      return {
        ...state,
        historyChart: action.payload,
      };

    case GET_COIN_BY_NAME:
      return {
        ...state,
        allCoins: action.payload,
      };

    case GET_COIN_DETAIL:
      return {
        ...state,
        coinDetails: action.payload,
      };

    case ORDER_QUOTES:
      let orderQuotes;
      // if(action.payload === "All"){
      //   orderQuotes = state.allCoins
      if (action.payload === "best") {
        orderQuotes = state.allCoins.sort(function (a, b) {
          if (a.current_price < b.current_price) {
            return 1;
          }
          if (a.current_price > b.current_price) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "worst") {
        orderQuotes = state.allCoins.sort(function (a, b) {
          if (a.current_price < b.current_price) {
            return -1;
          }
          if (a.current_price > b.current_price) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        allCoins: orderQuotes,
      };

    case ORDER_RANKS:
      let orderRank;
      if (action.payload === "+rank") {
        orderRank = state.allCoins.sort(function (a, b) {
          if (a.market_cap_rank < b.market_cap_rank) {
            return 1;
          }
          if (a.market_cap_rank > b.market_cap_rank) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "-rank") {
        orderRank = state.allCoins.sort(function (a, b) {
          if (a.market_cap_rank < b.market_cap_rank) {
            return -1;
          }
          if (a.market_cap_rank > b.market_cap_rank) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        allCoins: orderRank,
      };

    case ORDER_CHANGE_PERCENTAGE:
      let orderChange;
      if (action.payload === "more") {
        orderChange = state.allCoins.sort(function (a, b) {
          if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
            return 1;
          }
          if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "less") {
        orderChange = state.allCoins.sort(function (a, b) {
          if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
            return -1;
          }
          if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        allCoins: orderChange,
      };

    case POST_USER:
      return {
        ...state,
      };

    case ADD_FAVORITE:
      return {
        ...state,
        favoriteCoins: state.favoriteCoins.concat(action.payload),
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favoriteCoins: state.favoriteCoins.filter(
          (e) => e.id !== action.payload
        ),
      };

    case FILTER_FAVORITE:
      const allCoinsFavorites = state.favoriteCoins;
      return {
        ...state,
        allCoins: allCoinsFavorites,
      };

    // case CREATE_REVIEW:
    // return {
    //   ...state,
    //   reviews: action.payload
    // }

    case GET_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };

    case GET_USER_INFO:
      return{
        ...state,
        userInfo: action.payload
      }

    case UPDATE_USER_INFO:
      return{
        ...state,
        userInfo: state.user.info.concat(action.payload)
      }

    default:
      return state;
  }
}
export default rootReducer;
