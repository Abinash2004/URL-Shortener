const express = require("express");
const { handleGenerateShortURL, redirectToOriginalURL, getAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortURL);
router.get("/:id", redirectToOriginalURL);
router.get("/analytics/:id", getAnalytics);

module.exports = router;