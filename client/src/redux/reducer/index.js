import {
  GET_TRENDING_COINS,
  GET_ALL_COINS,
  GET_HISTORY_CHART,
  GET_COIN_DETAIL,
  GET_COIN_BY_NAME,
  ORDER_QUOTES,
  ORDER_RANKS,
  ORDER_CHANGE_PERCENTAGE,
  POST_USER
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

    case ORDER_QUOTES:
      let orderQuotes
            // if(action.payload === "All"){
            //   orderQuotes = state.allCoins
           if(action.payload === "best"){
            orderQuotes = state.allCoins.sort(function(a,b){
                  if(a.current_price < b.current_price) {return 1;}
                  if(a.current_price > b.current_price) {return -1;}
                  return 0
              })
          }else if(action.payload === "worst"){
              orderQuotes = state.allCoins.sort(function(a,b){
                    if(a.current_price < b.current_price) {return -1;}
                    if(a.current_price > b.current_price) {return 1;}
                    return 0;
                })
              }
            return{
                ...state,
                allCoins:orderQuotes
            }    

    case ORDER_RANKS:
      let orderRank
        if(action.payload === "+rank"){
          orderRank = state.allCoins.sort(function(a,b){
                if(a.market_cap_rank < b.market_cap_rank) {return 1;}
                if(a.market_cap_rank > b.market_cap_rank) {return -1;}
                return 0
            })
        }else if(action.payload === "-rank"){
            orderRank = state.allCoins.sort(function(a,b){
                  if(a.market_cap_rank < b.market_cap_rank) {return -1;}
                  if(a.market_cap_rank > b.market_cap_rank) {return 1;}
                  return 0;
              })
            }
          return{
              ...state,
              allCoins:orderRank  
        }
        
    case ORDER_CHANGE_PERCENTAGE:
      let orderChange
        if(action.payload === "more"){
          orderChange = state.allCoins.sort(function(a,b){
                if(a.price_change_percentage_24h < b.price_change_percentage_24h) {return 1;}
                if(a.price_change_percentage_24h > b.price_change_percentage_24h) {return -1;}
                return 0
            })
        }else if(action.payload === "less"){
            orderChange = state.allCoins.sort(function(a,b){
                  if(a.price_change_percentage_24h < b.price_change_percentage_24h) {return -1;}
                  if(a.price_change_percentage_24h > b.price_change_percentage_24h) {return 1;}
                  return 0;
              })
            }
          return{
              ...state,
              allCoins:orderChange  
        }
    
      case POST_USER:
          console.log('payload post:' + action.payload)
          return {
            ...state,
          }
    

    default:
      return state;
  }
}
export default rootReducer;
