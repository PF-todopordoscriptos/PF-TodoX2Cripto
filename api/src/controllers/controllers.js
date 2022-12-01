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

async function getHistoryChart(id) {
  //se puede definir dias y moneda

  const historyChart = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
  );
  console.log(historyChart);
  let coinChartDataObj = {};
  const coinChartData = historyChart.data.prices.map((value) => ({
    x: value[0],
    y: value[0].toFixed(2),
  }));
  coinChartDataObj = {
    id,
    coinChartData,
  };
  return coinChartDataObj;
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
  getHistoryChart,
  createUser,
};
