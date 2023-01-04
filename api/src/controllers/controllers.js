const axios = require("axios");
const { User, Coins, Review, CoinsReviews, AdminChanges } = require("../db");

async function getTrendingCoins() {
  const trendingCoins = await axios.get(
    "https://api.coingecko.com/api/v3/search/trending"
  );

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

async function getTrendingNews() {
  const trendingNews = await axios.get(
    "https://newsdata.io/api/1/news?apikey=pub_14581ec60a474fcda424b30ca7f553fd844cd&q=crypto"
  );

  let trendingNewsApi = trendingNews.data.results.map((n) => {
    let date = n.pubDate.split(" ");
    return {
      title: n.title,
      description: n.description,
      link: n.link,
      pubDate: date[0],
      country: n.country,
    };
  });
  return trendingNewsApi;
}

async function getHistoryChart(id, days) {
  //se puede definir dias y moneda

  const historyChart = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );

  let coinChartDataObj = {};
  const coinChartData = historyChart.data.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));
  coinChartDataObj = {
    id,
    coinChartData,
  };
  return coinChartDataObj;
}

// async function createUser(
//   username,
//   password,
//   name,
//   lastname,
//   email,
//   telephone,
//   dni,
//   nationality
// ) {
//   if (
//     !username ||
//     !password ||
//     !name ||
//     !lastname ||
//     !email ||
//     !telephone ||
//     !dni ||
//     !nationality
//   ) {
//     return "misign data";
//   }

//   let userDB = await User.findOne({
//     where: {
//       username: username.toLowerCase().trim(),
//     },
//   });
//   if (userDB) {
//     return "username is not available";
//   }

//   let emailDB = await User.findOne({
//     where: {
//       email: email.toLowerCase().trim(),
//     },
//   });
//   if (emailDB) {
//     return `there is already a user with the email ${email}`;
//   }

//   let dniDB = await User.findOne({
//     where: {
//       dni: dni,
//     },
//   });
//   if (dniDB) {
//     return `there is already a user with the DNI ${dni}`;
//   }

//   let newUser = await User.create({
//     username: username,
//     password: password,
//     name: name,
//     lastname: lastname,
//     email: email,
//     telephone: telephone,
//     dni: dni,
//     nationality: nationality,
//     coins: [],
//   });

//   return newUser;
// }

async function getAllUsers() {
  let allUsers = await User.findAll();
  return allUsers;
}

async function modifyUserAdmin(id, admin) {
  await User.update({ admin: admin }, { where: { id: id } });
}

async function modifyUserDisabled(id, disabled) {
  await User.update({ disabled: disabled }, { where: { id: id } });
}

async function modifyUserPassword(id, password) {
  await User.update({ password: password }, { where: { id: id } });
}

async function getUserById(id) {
  const res = await User.findByPk(id);
  return res;
}

async function getAllCoins() {
  const allCoins = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );

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

async function getCoinDetail(id) {
  try {
    const detailApi = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    const coinDetail = {
      id: detailApi.data.id,
      name: detailApi.data.name,
      symbol: detailApi.data.symbol,
      image: detailApi.data.image.large,
      current_price: detailApi.data.market_data.current_price.usd,
      market_cap: detailApi.data.market_data.market_cap.usd,
      price_change_percentage_24h:
        detailApi.data.market_data.price_change_percentage_24h,
    };
    return coinDetail;
  } catch (error) {
    return `Couldn't find a Coin named ${id}`;
  }
}

async function createReview(stars, text, coinName, nickname) {
  let review = await Review.create({
    stars,
    text,
  });
  let coin = await Coins.findOne({
    where: {
      name: coinName,
    },
  });
  await coin.addReview(review);
  let user = await User.findOne({
    where: {
      nickname: nickname,
    },
  });
  await user.addReview(review);
  return review;
}

async function getReviews(name) {
  try {
    let coinId = await Coins.findOne({
      where: {
        name: name,
      },
      attributes: ["id"],
    });
    let coinsReviews = await CoinsReviews.findAll({
      where: {
        coinId: coinId.id,
      },
    });

    let reviews = await coinsReviews.map(async (c) => {
      return await Review.findOne({
        where: {
          id: c.dataValues.reviewId,
        },
      });
    });
    let reviewsDone = await Promise.all(reviews);

    return reviewsDone;
  } catch (error) {
    return error;
  }
}

async function postCoinsAPItoDB() {
  const allCoinsFromAPI = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  allCoinsFromAPI.data.forEach(async (e) => {
    if ((await Coins.findByPk(e.id)) === null) {
      await Coins.create({
        name: e.name,
        id: e.id,
      });
    }
  });
  let allCoinsFromDb = await Coins.findAll();
  return allCoinsFromDb;
}

async function getCoinsFromDB() {
  let allCoinsFromDb = await Coins.findAll();
  return allCoinsFromDb;
}

async function modifyCoinDisabled(id, disabled) {
  await Coins.update({ disabled: disabled }, { where: { id: id } });
}

async function getCoinFromDBbyID(id) {
  const res = await Coins.findByPk(id);
  return res;
}

async function getUserByEmail(email) {
  let findUser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!findUser) {
    throw new Error();
  }
  return findUser;
}

async function updateUser(
  email,
  username,
  name,
  lastname,
  // telephone,
  // dni,
  nationality,
  img
) {
  // let userDB = await User.findOne({
  //   where: {
  //     username: username.toLowerCase().trim(),
  //   },
  // });

  // if (userDB) {
  //   throw new Error("username is not available");
  // }

  // let dniDB = await User.findOne({
  //   where: {
  //     dni: dni,
  //   },
  // });
  // if (dniDB) {
  //   throw new Error(`there is already a user with the DNI ${dni}`);
  // }

  const resp = await User.update(
    {
      username: username,
      name: name,
      lastname: lastname,
      // telephone: telephone,
      // dni: dni,
      nationality: nationality,
      img: img,
    },
    {
      where: { email },
    }
  );
  return resp;
}

async function postAdminChanges(
  idAdmin,
  emailAdmin,
  idUser,
  emailUser,
  idCoin,
  nameCoin,
  dataModified,
  newValue
) {
  await AdminChanges.create({
    idAdmin: idAdmin,
    emailAdmin: emailAdmin,
    idUser: idUser,
    emailUser: emailUser,
    idCoin: idCoin,
    nameCoin: nameCoin,
    dataModified: dataModified,
    newValue: newValue,
  });
  return "DONE";
}

async function getAllAdminChanges() {
  let allChanges = await AdminChanges.findAll();
  return allChanges;
}

async function addCoinsUser(id) {
  let coinsDb = await getCoinsFromDB();
}

module.exports = {
  getTrendingCoins,
  getHistoryChart,
  //createUser,
  getAllCoins,
  getCoinDetail,
  getAllUsers,
  createReview,
  postCoinsAPItoDB,
  modifyUserAdmin,
  modifyUserDisabled,
  modifyUserPassword,
  getUserById,
  getReviews,

  getUserByEmail,
  updateUser,

  getCoinsFromDB,
  modifyCoinDisabled,
  getCoinFromDBbyID,
  getTrendingNews,
  postAdminChanges,
  getAllAdminChanges,
};
