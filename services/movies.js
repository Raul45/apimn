const MongoLib = require('../lib/mongo');

class moviesService{
    constructor(){
        this.collection = 'movies';
        this.MongoDB = new MongoLib();
    }
    async getMovies({tags}){
        const query = tags && {tags: {$in: tags}};
        const movies = await this.MongoDB.getAll(this.collection, query); 
        return movies || [];
    }

async getMovie({movieId}){
    const movie = await this.MongoDB.get(this.collection, movieId);
    return movie || [];
}
async createMovie({movie}){
    const createMovieId = await this.MongoDB.create(this.collection, movie);
    return createMovieId;
}
async updateMovie({movieId, movie} = {}){
    const updateMovieId = await this.MongoDB.update(this.collection, movieId, movie);
    return updateMovieId;
}
async deleteMovie({movieId}){
    const deletedMovieId = await this.MongoDB.delete(this.collection, movieId);
    return deletedMovieId;
}
}

module.exports = moviesService;