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

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use('/users', require('./routes/usersRoutes'))
app.use('/authors', require('./routes/authorsRoutes'))
app.use('/', (req, res) => {
    res.send('Authors API');
})

// const outputFile = "./swagger_output.json";
//
// const endpointsFiles = ["./routes/authorsRoutes.ts"];
//
// swaggerAutogen(outputFile, endpointsFiles);

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
})
