import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { moviesRouter } from "./routes/movies.js";

export const app = express();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("Server is listening at port no : " + PORT);
});

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("Movie Reviews App Home Page");
})

dotenv.config();

// const MONGO_URL = "mongodb://localhost";
// const MONGO_URL = "mongodb+srv://Shankar:<password>@cluster0.juv47.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB Connected");
  return client;
}

export const client = await createConnection();


app.use("/movies", moviesRouter);