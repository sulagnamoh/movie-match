const express = require("express");
const { collection, movieCollection, ratingCollection } = require("./mongo");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the backend!");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email, password });

        if (user) {
            res.json({ status: "success", user });
        } else {
            res.json({ status: "fail" });
        }

    } catch (e) {
        res.json({ status: "error" });
    }
});

app.post("/register", async (req, res) => {
    const { email, name, password } = req.body;

    const data = {
        email,
        password,
        name,
    };

    try {
        const check = await collection.findOne({ email });

        if (check) {
            res.json("exist");
        } else {
            await collection.create(data);
            res.json("notexist");
        }

    } catch (e) {
        res.json("error");
    }
});

app.get("/api/movies", async (req, res) => {
    try {
        const movies = await movieCollection.find({});
        res.json(movies);
    } catch (e) {
        res.status(500).send('Error fetching movies: ' + e.message);
    }
});

app.post("/api/movies", async (req, res) => {
    const { title, genre, streamingPlatforms } = req.body;
    try {
        const newMovie = await movieCollection.create({ title, genre, streamingPlatforms });
        res.status(201).json(newMovie);
        console.log(`Movie ${title} added successfully`);
    } catch (e) {
        res.status(500).send('Error adding movie: ' + e.message);
        console.error("Error adding movie:", e);
    }
});

app.post("/user-data", async (req, res) => {
    const { userID, movieID, rating } = req.body;

    try {
        const newRating = { userID, movieID, rating };
        
        const checkRating = await ratingCollection.findOne({ userID, movieID });
        if (checkRating) {
            // Update existing rating
            await ratingCollection.updateOne({ userID, movieID }, { $set: { rating } });
            res.json({ status: "updated", rating: newRating });
            console.log("Rating updated");
        } else {
            // Insert new rating
            await ratingCollection.create(newRating);
            res.json({ status: "saved", rating: newRating });
            console.log("Rating saved");
        }
    } catch (e) {
        res.status(500).send("Error saving rating");
        console.error("Error saving rating:", e);
    }
});

app.get('/api/user-ratings/:userID', async (req, res) => {
    const { userID } = req.params;
    console.log(`Fetching ratings for userID: ${userID}`);

    try {
        const ratings = await ratingCollection.find({ userID: userID });
        console.log(`Ratings found: ${JSON.stringify(ratings)}`);
        res.json(ratings);
    } catch (e) {
        console.error('Error fetching user ratings:', e);
        res.status(500).send('Error fetching user ratings: ' + e.message);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
