import express from "express";
import connectDB from "./config/db.js";
import AuthRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", AuthRoute); 

connectDB();
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})