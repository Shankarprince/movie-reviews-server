import express from "express";
import  {
    getMoviesById, 
    getMoviesByFilter, 
    postMovies, 
    deleteMovieById, 
    updateMovieById
} from "../helper.js";

const router = express.Router();

router.
    route("/")
    .get(async (request, response) => {
    const filter = request.query;
    if (filter.rating) {
        filter.rating = parseInt(filter.rating);
    }
    const movie = await getMoviesByFilter(filter);
    console.log(filter);
    movie
        ? response.send(movie)
        : response.status(404).send("No matching movies found");
})
    .post(async (request, response) => {
    const data = request.body;
    const result = await postMovies(data);
    response.send(result);
})

router.
    route("/:id")
    .get(async (request, response) => {
    const { id } = request.params;
    const movie = await getMoviesById(id);
    movie
        ? response.send(movie)
        : response.status(404).send("No movies found");
})
    .delete(async (request, response) => {
    const { id } = request.params;
    const remainingMovies = await deleteMovieById(id);
    remainingMovies.deletedCount > 0
        ? response.send(remainingMovies)
        : response.status(404).send("No matching movies found");
})
    .put(async (request, response) => {
    const { id } = request.params;
    const data = request.body;
    const editedMovies = await updateMovieById(id, data);
    editedMovies
        ? response.send(editedMovies)
        : response.status(404).send("No movies found to edit");
});

export const moviesRouter = router;