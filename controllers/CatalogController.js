const MovieModel = require("../models/Movie")

exports.GetIndex = (req, res, next) => {
    
    MovieModel.GetAll(function(movies) {
        res.render("catalog/index", {
            pageTitle: "Movie Catalog",
            movs: movies,
            hasMovies: movies.length > 0,
            CatalogActive: true,
        });
    }) 
};