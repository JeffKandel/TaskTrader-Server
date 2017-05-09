// express and server
const express = require('express')

// database
const db = require('../db/db')
const models = db.models

// graphql
var { GraphQLSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const { generateSchema } = require('graphql-sequelize-schema-generator')
const { buildSchema } = require('graphql')

// misc. middleware
const bodyParser = require('body-parser')
const PrettyError = require('pretty-error')
const finalHandler = require('finalHandler')

// app definition
const app = express()

// Logging middleware (dev only)
if (!process.env.IS_PRODUCTION) {
  app.use(require('volleyball'))
}


app.use('/*',
    graphqlHTTP({
      schema: new GraphQLSchema(generateSchema(models)),
      graphiql: true
    }))
  .use((err, req, res, next) => {
    console.error(prettyError.render(err))
    finalHandler(req, res)(err)
  })

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
