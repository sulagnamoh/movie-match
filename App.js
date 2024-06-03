const express = require("express");
const { collection, movieCollection } = require("./mongo");
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
        const user = await collection.findOne({ email: email, password: password });

        if (user) {
            res.json({ status: "success", user: user });
        } else {
            res.json({ status: "fail" });
        }

    } catch (e) {
        res.json({ status: "error" });
    }
});



app.post("/register",async(req,res)=> {
    const{email,name, password} = req.body

    const data={
        email:email,
        password:password,
        name:name,
    }



    try {
        const check=await collection.findOne({email:email})

        if(check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e) {
        res.json("notexist")

    }
})

app.get("/api/movies", async (req, res) => {
    try {
        const movies = await movieCollection.find({});
        res.json(movies); 
    } catch (e) {
        res.status(500).send('Error fetching movies: ' + e.message);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/api/movies", async (req, res) => {
    const { title, genre, streamingPlatforms } = req.body;
    try {
        const newMovie = new movieCollection({
            title,
            genre,
            streamingPlatforms
        });
        await newMovie.save();
        res.status(201).json(newMovie);
        console.log(`Movie ${title} added successfully`);
    } catch (e) {
        res.status(500).send('Error adding movie: ' + e.message);
        console.error("Error adding movie:", e);
    }
});