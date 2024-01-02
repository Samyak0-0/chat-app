import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { userModel } from './models/user';
import jwt from "jsonwebtoken"


const app = express();
dotenv.config()
mongoose.connect(process.env.MONGO_URL)

jwtSecret = process.env.JWT_SECRET




app.get('/test', (req,res) => {
    res.json('test ok now');
})

app.post('/register', async (req,res) => {
    const {username, password} = req.body
    const createdUser = await userModel.create({username, password})
    jwt.sign({userId:createdUser._id}, jwtSecret, (err, token) => {
        if(err) {
            throw err;
        }
        res.cookie('token', token).status(201).json('ok')
    })
})

app.listen(4000)

//D5ewITWTTVZmmmLI