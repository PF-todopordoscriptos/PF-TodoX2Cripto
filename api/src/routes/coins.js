const { Router } = require("express");
const axios = require("axios");
const {
  getTrendingCoins,
  getHistoryChart,
  getAllCoins,
  getCoinDetail,
  createReview,
  postCoinsAPItoDB,
  getReviews,
  getCoinsFromDB,
  modifyCoinDisabled,
  getCoinFromDBbyID,
  getTrendingNews
} = require("../controllers/controllers.js");

const router = Router();

router.get("/trending", async (req, res) => {
  try {
    let trendingCoins = await getTrendingCoins();
    res.status(200).json(trendingCoins);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/trendingNews", async (req, res) => {
    // const options = {
    //   method: 'GET',
    //   url: 'https://crypto-news11.p.rapidapi.com/cryptonews/bitcoin',
    //   params: {max_articles: '10', last_n_hours: '48', top_n_keywords: '10'},
    //   headers: {
    //     'X-RapidAPI-Key': '9a68656baamsh1cfc3e752bd68d4p1bd547jsndc88570634fb',
    //     'X-RapidAPI-Host': 'crypto-news11.p.rapidapi.com'
    //   }
    // };
    
    // axios.request(options).then(function (response) {
    //   res.status(200).json(response.data.articles);
    // }).catch(function (error) {
    //   res.status(400).json(error);
    // });

    try {
      let trendingNews = await getTrendingNews();
      res.status(200).json(trendingNews);
    } catch (err) {
      res.status(400).json(err.message);
    }
});

router.get("/allcoins", async (req, res) => {
  try {
    let allCoins = await getAllCoins();
    const { name } = req.query;
    if (name) {
      let coinName = allCoins.filter((c) =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
      if (coinName.length === 0) {
        return res.status(200).json(["Ninguna moneda coincide"]);
      } else {
        return res.status(200).send(coinName);
      }
    }
    res.status(200).json(allCoins);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/chart/:id", async (req, res) => {
  const { id } = req.params;
  const { days } = req.query;
  try {
    let chart = await getHistoryChart(id, days);
    res.status(200).json(chart);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let coinDetail = await getCoinDetail(id);
    res.status(200).send(coinDetail);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/reviews/:name", async (req, res) => {
  const { name } = req.params;
  const { stars, text, username } = req.body;
  try {
    let coinReview = await createReview(stars, text, name, username);
    res.send(coinReview);
  } catch (error) {
    res.send(error);
  }
});

router.get("/reviews/:name", async (req, res) => {
  const { name } = req.params;
  try {
    let review = await getReviews(name);
    res.send(review);
  } catch (error) {
    res.send("error");
  }
});

router.post("/postCoinsAPItoDB", async (req, res) => {
  try {
    let coinsDb = await postCoinsAPItoDB();
    res.send(coinsDb);
  } catch (error) {
    res.send(error);
  }
});

router.get("/getCoinsFromDB", async (req, res) => {
  try {
    const allCoins = await getCoinsFromDB();
    res.status(200).send(allCoins);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.put("/modifyCoinDisabled", async (req, res) => {
  const { id, disabled } = req.body;
  try {
    await modifyCoinDisabled(id, disabled);
    const findCoinInDb = await getCoinFromDBbyID(id);
    res.status(200).send(findCoinInDb);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
