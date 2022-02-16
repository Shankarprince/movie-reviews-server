import { ObjectID } from "mongodb";
import { client } from "./index.js";

function getMoviesById(id) {
    return client.db("b28wd").collection("movies").findOne({ _id: new ObjectID(id) });
}
function getMoviesByFilter(filter) {
    return client.db("b28wd").collection("movies").find(filter).toArray();
}
function postMovies(data) {
    return client.db("b28wd").collection("movies").insertOne(data);
}
function deleteMovieById(id) {
    return client.db("b28wd").collection("movies").deleteOne({ _id: new ObjectID(id) });
}
function updateMovieById(id, data) {
    return client.db("b28wd").collection("movies").updateOne({ _id: new ObjectID(id) }, { $set: data });
}

export {
    getMoviesById,
    getMoviesByFilter,
    postMovies,
    deleteMovieById,
    updateMovieById
}