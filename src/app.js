import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import http from 'http';
import indexRouter from './routes/index'

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extends:false}));
app.use(cookieParser());
app.use(express.static(path.resolve (__dirname,'../view')));
app.use(morgan('dev'));
app.use(cors());

app.use(
    session({
        secret:process.env.APP_KEY,
        resave:false,
        saveUninitialized:false,
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/api',indexRouter)

const server = http.createServer(app);

server.listen(3000);

server.on('listening',()=>{
    const addr = server.address();
    console.log(`this is server on ${addr.port}`);
})