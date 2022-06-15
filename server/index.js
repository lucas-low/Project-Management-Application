const express = require('express')
const colors = require('colors')
const cors = require('cors')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')
const path = require('path') //this is to get the path to the public folder

const app = express();

app.use(cors());

// connect to the database
connectDB()

// use graphql-playground in development mode
app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  );
// use static folder
app.use(express.static('public'))

// serve the react app in production mode
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html')) })

    

const port = process.env.PORT || 5000

app.listen(port, console.log(`Server is running on port ${port}`));