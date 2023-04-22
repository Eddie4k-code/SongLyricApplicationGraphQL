const express = require('express');
const cors = require('cors');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const dotenv = require("dotenv").config();
const app = express();


app.listen(4000, () => {

	console.log('On Port 4000');

})

// Replace with your mongoLab URI
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = 'music';
if (!MONGO_URI) {
	throw new Error('You must provide a MongoLab URI');
}

mongoose.connect(MONGO_URI).then(() => console.log('DB STARTED'));

app.use(cors());

app.use(bodyParser.json());
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
);

// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config.js');
// app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
