const axios = require("axios");

async function getTrendingCoins() {
  const trendingCoins = await axios.get(
    "https://api.coingecko.com/api/v3/search/trending"
  );
  console.log(trendingCoins);
  let trendingCoinsApi = trendingCoins.data.coins.map((c) => {
    return {
      id: c.item.id,
      coin_id: c.item.coin_id,
      name: c.item.name,
      symbol: c.item.symbol,
      market_cap_rank: c.item.market_cap_rank,
      large: c.item.large,
      slug: c.item.slug,
      price_btc: c.item.price_btc,
      score: c.item.score,
    };
  });
  return trendingCoinsApi;
}

module.exports = {
  getTrendingCoins,
};
