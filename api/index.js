import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "./models/User.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connection successfuly !");
  })
  .catch((err) => {
    console.log("unsuccessfull connection");
  });

app.use(express.json());
app.use(cookieParser());

const jwtSecret = process.env.JWT_SECRET;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);



app.get("/test", (req, res) => {
  res.json("test ok now");
});



app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await UserModel.create({ username, password });

    jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {sameSite: "none", secure:"true"}).status(201).json({
        id: createdUser._id,
      });
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json("ERROR");
  }
});


app.post('/login', async(req,res) => {
  const {username , password} = req.body
  const foundUser = await UserModel.find({username})
})


app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json('no token')
  }
});

app.listen(4000);

//D5ewITWTTVZmmmLI

//p50ky1PoLLx6EYvZ
