/*eslint-disable*/
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
  GET_TRENDING_NEWS,
  SET_THEME_MODE,
  ADD_TO_CART,
  ADD_ONE_FROM_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  CREATE_WARNING,
  GET_ALL_WARNINGS,
  CLEAR_ADMIN,
  COIN_COMMENT,
  POST_COMMENT,
  GET_ALL_COMMENTS,
  GET_USER_CART,
  DELETE_COMMENT,
  GET_ALL_TRANSACTIONS,
  GET_ALL_USERS,
  GET_WALLET,
} from "../actions/actionTypes";

export const initialState = {
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
  userCart:[],
  themeMode: "light",
  cart: [],
  comments: [],
  allComments : [],
  allWarnings: [],
  allTransactions: [],
  allUsers: [],
  userWallet: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDING_COINS:
      return {
        ...state,
        trendingCoins: action.payload,
      };
    case GET_TRENDING_NEWS:
      return {
        ...state,
        trendingNews: action.payload,
      };
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
      return {
        ...state,
        userInfo: action.payload,
      };

    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    case SET_THEME_MODE:
      return {
        ...state,
        themeMode: action.payload,
      };
    ///////////////////////////////////////////////////////////////////// carrito de compras API Home
    case ADD_TO_CART: {
      let newItem = state.allCoins.find(
        (product) => product.id === action.payload
      );
      // console.log(newItem);

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };
      // return {
      //   ...state,
      //   cart: state.cart.concat(action.payload),
      // };
    }
    case ADD_ONE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }
    case REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case CLEAR_CART: {
      return initialState;
    }
    case GET_ALL_WARNINGS:{
      return{
        ...state,
        allWarnings: action.payload
      }
    }
    case CREATE_WARNING: {
      return {
        ...state,
      };
    }
    case COIN_COMMENT:{
      return {
        ...state,
        comments: action.payload,
      }
    }
    case POST_COMMENT: {
      return {
        ...state,
      };
    }
    case GET_ALL_COMMENTS: {
      return{
        ...state,
        allComments: action.payload
      }
    }
    case CLEAR_ADMIN: {
      return {
        ...state,
        userInfo: [],
      };
    }
    case GET_USER_CART: {
      return {
        ...state,
        userCart: action.payload,
      };
    }

    case DELETE_COMMENT: {
      return{
        ...state
      }
    }

    case GET_ALL_TRANSACTIONS: {
      return {
        ...state,
        allTransactions: action.payload,
      }
    }

    case GET_ALL_USERS: {
      return {
        ...state,
        allUsers: action.payload,
      }
    }

    case GET_WALLET: {
      return {
        ...state,
        userWallet: action.payload,
      }
    }
    
    default:
      return state;
  }
  //   /////////////////////////////////////////////////////////// carrito de compras
  //   case ADD_TO_CART: {
  //     let newItem = state.products.find(
  //       (product) => product.id === action.payload
  //     );
  //     // console.log(newItem);

  //     let itemInCart = state.cart.find((item) => item.id === newItem.id);

  //     return itemInCart
  //       ? {
  //           ...state,
  //           cart: state.cart.map((item) =>
  //             item.id === newItem.id
  //               ? { ...item, quantity: item.quantity + 1 }
  //               : item
  //           ),
  //         }
  //       : {
  //           ...state,
  //           cart: [...state.cart, { ...newItem, quantity: 1 }],
  //         };
  //   }
  //   case REMOVE_ONE_FROM_CART: {
  //     let itemToDelete = state.cart.find((item) => item.id === action.payload);

  //     return itemToDelete.quantity > 1
  //       ? {
  //           ...state,
  //           cart: state.cart.map((item) =>
  //             item.id === action.payload
  //               ? { ...item, quantity: item.quantity - 1 }
  //               : item
  //           ),
  //         }
  //       : {
  //           ...state,
  //           cart: state.cart.filter((item) => item.id !== action.payload),
  //         };
  //   }
  //   case REMOVE_ALL_FROM_CART: {
  //     return {
  //       ...state,
  //       cart: state.cart.filter((item) => item.id !== action.payload),
  //     };
  //   }
  //   case CLEAR_CART:
  //     return initialState;

  //   default:
  //     return state;
  // }
}
export default rootReducer;
