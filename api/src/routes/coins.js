const { Router } = require("express");
const {
  getTrendingCoins,
  getHistoryChart,
  getAllCoins,
  getCoinDetail
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
router.get("/allcoins", async (req, res) => {
  try {
    let allCoins = await getAllCoins();
    const {name} = req.query
    if(name){
      let coinName = allCoins.filter((c) => 
      c.name.toLowerCase().includes(name.toLowerCase()))
      if(coinName.length === 0){
        return res.status(200).json(['Ninguna moneda coincide'])
      }else{
        return res.status(200).send(coinName)
      }
    }
    res.status(200).json(allCoins);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/chart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let chart = await getHistoryChart(id);
    res.status(200).json(chart);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/details/:id", async (req, res) => {
  const { id } = req.params
  try {
    let coinDetail = await getCoinDetail(id)
    res.status(200).send(coinDetail)
  } catch (error) {
    res.status(404).send(error)
  }
})

module.exports = router;
