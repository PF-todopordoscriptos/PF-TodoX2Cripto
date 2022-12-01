const { Router } = require("express");
const { getTrendingCoins, getAllCoins } = require("./controllers");

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
    res.status(200).json(allCoins);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
