import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "./models/User.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs"
import WebSocket, { WebSocketServer } from "ws";

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
const bcryptSalt = bcrypt.genSaltSync(10)

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
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
    const createdUser = await UserModel.create({ username: username, password: hashedPassword });

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
  const foundUser = await UserModel.findOne({username})

  if(foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password)
    if(passOk) {
      jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: foundUser._id,
        });
      });
    }
  }

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

const server = app.listen(4000);

const wss = new WebSocketServer({server})
wss.on('connection', (connection, req) => {
  const cookies = req.headers.cookie

  if(cookies) {
    const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='))
    if(tokenCookieString) {
      const token = tokenCookieString.split('=')[1]
      if(token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if(err) throw err;
          const {userId , username} = userData
          connection.userId = userId
          connection.username = username
        })
      }
    }
  }

  connection.on('message', (message) => {
    const messageData = JSON.parse(message.toString());
    const {recipient, text} = messageData
    if(recipient && text) {
      [...wss.clients]
      .filter(c => c.userId === recipient)
      .forEach(c => c.send(JSON.stringify({text})))
    }
  });

  [...wss.clients].forEach(client => {
    client.send(JSON.stringify({
      online: [...wss.clients].map(c => ({userId: c.userId, username: c.username}))
    }
    ))
  })
})



//D5ewITWTTVZmmmLI

//p50ky1PoLLx6EYvZ
