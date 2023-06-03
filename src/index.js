const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport')
// require('./strategies/local')
require('./strategies/discord')

// Routes
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/markets');
const authRoutes = require('./routes/auth');

require('./database')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(session({
    secret: "SECRET-KEY",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/belajar_express'
    }),
}))


app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
})

// Passport middleware init
app.use(passport.initialize());
app.use(passport.session())

app.use("/groceries", groceriesRoute);
app.use("/markets", marketsRoute);
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Running on ${PORT}`));

