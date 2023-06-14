import express from 'express';
import dotenv from 'dotenv'
import {connectDB} from './util/db.js';
import cors from 'cors'
import userRouter from './routers/user.router.js';
import { genErrHand, noRoute } from './middleware/err.handler.js';
import cookieParser from 'cookie-parser';

const app = express()
dotenv.config()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    optionsSuccessStatus:200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
})
);
// app.use(cors())

app.use("/users", userRouter)

app.use(noRoute)
app.use(genErrHand)

const port = process.env.PORT
app.listen(port, () => console.log(`Server is up on ${port}`));