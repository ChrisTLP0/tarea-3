const Movie = require("../models/Movie")

exports.GetAddMovie = (req, res, next) => {
    res.render("admin/add-movie", {
        pageTitle: "Add Movie",
        AddMovieActive: true,
        editMode: false
    });
};

exports.GetMovies = (req, res, next) => {

    Movie.GetAll(function(movies) {
        res.render("admin/catalog", {
        pageTitle: "Admin Movies",
        movs: movies,
        hasMovies: movies.length > 0,
        MoviesActive: true,})
    });
};

exports.PostAddMovie = (req, res, next) => {

    const title = req.body.Title;
    const description = req.body.Description;
    const genre = req.body.Genre;

    const movie = new Movie(null, title, description, "Active", genre);
    movie.Save();

    res.redirect("/");
};

exports.GetEditMovie = (req, res, next) => {
    const movieId = req.params.movieId;
    const edit = req.query.edit;

    if(!edit){
        return res.redirect("/");
    }

    Movie.GetById(movieId, (movie) => {
        res.render("admin/add-movie", {
        pageTitle: "Edit Movies",
        editMode: edit,
        movie: movie,
        });
    });
};

exports.PostEditMovie = (req, res, next) => {

    const id = req.body.MovieID;
    const title = req.body.Title;
    const description = req.body.Description;
    const status = req.body.Status;
    const genre = req.body.Genre;

    const movie = new Movie(id, title, description, status, genre);
    movie.Save();

    res.redirect("/admin/catalog");
};

exports.DeleteMovie = (req, res, next) => {

    const id = req.body.MovieID;

    Movie.Delete(id);

    res.redirect("/admin/catalog");
};