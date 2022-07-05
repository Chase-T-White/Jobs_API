require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// Middlewares
app.use(express.json());

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (err) {
        console.log(err);
    };
};

start();