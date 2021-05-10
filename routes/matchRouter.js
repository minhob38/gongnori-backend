const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const Match = require("../models/Match");
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    const { year, month, date } = req.query;

    const thresMin = new Date(year, (parseInt(month, 10) - 1).toString(), date);
    const thresMax = new Date(year, (parseInt(month, 10) - 1).toString(), (parseInt(date, 10) + 1));

    const matches = await Match.find({
      "playtime.start": { $gte: thresMin, $lte: thresMax },
    });

    res.status(200).json({
      message: "success",
      data: matches,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      message: "fail",
      data: null,
      error: "error",
    });

    console.error(`GET : /match/query - ${err.messsage}`);
    next(createError(500, "Internal Server Error"));
  }
});

module.exports = router;