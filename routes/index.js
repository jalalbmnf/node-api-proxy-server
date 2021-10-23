const url = require("url");
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apiCache = require("apicache");

// ENV VARS

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// INIT CACHE

let cache = apiCache.middleware;

router.get("/", cache("2 minutes"), async (req, res, next) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiRes = await needle("get", `${API_BASE_URL}?${params}`);

    const data = apiRes.body;

    // LOG REQ. TO THE PUBLIC API
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST:${API_BASE_URL}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
