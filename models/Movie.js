const fs = require("fs");
const path = require("path");

const dataPath = path.join(path.dirname(require.main.filename),"data", "movies.json");

const GetAllMoviesFromFile = function (cb){

    fs.readFile(dataPath, function(error,data) {

        if(error){
            cb([]);
        }else{
            cb(JSON.parse(data));
        }
        
    });

};

module.exports = class Movie{

    constructor(id, title,description,status,genre){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.genre = genre;
    }

    Save(){

        GetAllMoviesFromFile((movies) => {

            if (this.id) {
                const editMovieIndex = movies.findIndex(
                    (movs) => movs.id === this.id
                    );

                    movies[editMovieIndex] = this;
                    fs.writeFile(dataPath, JSON.stringify(movies),function(error){
                        console.log(error);
                    });
            } else {
                this.id = Math.random().toString();
                movies.push(this);
                fs.writeFile(dataPath, JSON.stringify(movies),function(error){
                console.log(error);
            });
            } 
        });
    }

    static GetAll(cb){
        GetAllMoviesFromFile(cb);
    }

    static GetById(id, cb){
        GetAllMoviesFromFile((movies) => {
            const movie = movies.find((m) => m.id === id);
            cb(movie);
        });
    }

    static Delete(id){
        GetAllMoviesFromFile((movies) => {
            const movie = movies.find((m) => m.id === id);

            const newMovieCatalog = movies.filter(movs => movs.id !== id);
            
            fs.writeFile(dataPath, JSON.stringify(newMovieCatalog),function(error){
                console.log(error);
            });
        });
    }
};