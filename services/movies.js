const MongoLib = require('../lib/mongo');

class MoviesService {
    constructor(){
        this.collection = 'movies';
        this.mongoDB = new MongoLib();
    }

    async getMovies({ tags }){
        const query = tags && { tags: { $in: tags }};
        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({ movieId }){
        const movie = await this.mongoDB.get(this.collection, movieId);
        return movie || {};
    }

    async createMovie({ movie }){
        const createMovieId = await this.mongoDB.create(this.collection, movie);
        return createMovieId;
    }

    async updateMovie({ movieId, movie }= {}){
        const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        return updatedMovieId;
    }

    async deleteMovie({ movieId }){
        const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
        return deletedMovieId;
    }
    /*
    //reto
    async patchMovie() {
        // revolvemos el id del registro modificado
        const updatedMovieId = await Promise.resolve(moviesMock[0].id);
        // retornamos el id
        return updatedMovieId;
    }
    */
}

module.exports = MoviesService;