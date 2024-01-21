import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwtMiddleware from './lib/jwtMiddleware.js';
import cookieParser from 'cookie-parser';

import userRouter from './api/userRouter.js';

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected');
    })
    .catch((e) => {
        console.error(e);
    });

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

app.use(cookieParser());
app.use(jwtMiddleware);

app.use('/', userRouter);
app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
