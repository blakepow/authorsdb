import express from 'express';
const dotenv = require('dotenv').config();

import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./swagger_output.json');

import connectDB from "./config/db";

const app = express();

const port = process.env.PORT || 5000;

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/', require('./routes/authorsRoutes'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const outputFile = "./swagger_output.json";
//
// const endpointsFiles = ["./dist/routes/authorsRoutes.js"];
//
// swaggerAutogen(outputFile, endpointsFiles);

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
})
