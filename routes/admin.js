const express = require("express");

const adminController = require("../controllers/AdminController");

const router = express.Router();

const Movies = [];

router.get("/add-movie", adminController.GetAddMovie);
router.post("/add-movie", adminController.PostAddMovie);

router.get("/catalog", adminController.GetMovies);

router.get("/edit-movie/:movieId", adminController.GetEditMovie);
router.post("/edit-movie", adminController.PostEditMovie);

router.post("/delete-movie", adminController.DeleteMovie);

module.exports = router;