const express = require("express");

const router = express.Router();

const catalogController = require("../controllers/CatalogController");

router.get("/", catalogController.GetIndex);

module.exports = router;