const axios = require("axios");
const { User, Coins } = require("../db");

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
async function getAllCoins() {
  const allCoins = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  console.log(allCoins);
  let allCoinsApi = allCoins.data.map((e) => {
    return {
      id: e.id,
      symbol: e.symbol,
      name: e.name,
      image: e.image,
      current_price: e.current_price,
      market_cap: e.market_cap,
      market_cap_rank: e.market_cap_rank,
      fully_diluted_valuation: e.fully_diluted_valuation,
      total_volume: e.total_volume,
      high_24h: e.high_24h,
      low_24h: e.low_24h,
      price_change_24h: e.price_change_24h,
      price_change_percentage_24h: e.price_change_percentage_24h,
      market_cap_change_24h: e.market_cap_change_24h,
      market_cap_change_percentage_24h: e.market_cap_change_percentage_24h,
      circulating_supply: e.circulating_supply,
      total_supply: e.total_supply,
      max_supply: e.max_supply,
      ath: e.ath,
      ath_change_percentage: e.ath_change_percentage,
      ath_date: e.ath_date,
      atl: e.atl,
      atl_change_percentage: e.atl_change_percentage,
      atl_date: e.atl_date,
      roi: e.roi,
      last_updated: e.last_updated,
    };
  });
  return allCoinsApi;
}

async function createUser(
  username,
  password,
  name,
  lastname,
  email,
  telephone,
  dni,
  nationality
) {
  if (
    !username ||
    !password ||
    !name ||
    !lastname ||
    !email ||
    !telephone ||
    !dni ||
    !nationality
  ) {
    return "misign data";
  }

  let userDB = await User.findOne({
    where: {
      username: username.toLowerCase().trim(),
    },
  });
  if (userDB) {
    return "username is not available";
  }

  let emailDB = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
    },
  });
  if (emailDB) {
    return `there is already a user with the email ${email}`;
  }

  let dniDB = await User.findOne({
    where: {
      dni: dni,
    },
  });
  if (dniDB) {
    return `there is already a user with the DNI ${dni}`;
  }

  let newUser = await User.create({
    username: username,
    password: password,
    name: name,
    lastname: lastname,
    email: email,
    telephone: telephone,
    dni: dni,
    nationality: nationality,
    coins: [],
  });

  return newUser;
}

module.exports = {
  getTrendingCoins,
  createUser,
  getAllCoins,
};
