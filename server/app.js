const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const PrettyError = require('pretty-error')


if (!process.env.IS_PRODUCTION) {
  // Logging middleware (dev only)
  app.use(require('volleyball'))
}

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = { hello: () => 'Hello world!' }

const app = express()

app.use('/*', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})).use((err, req, res, next) => {
  console.error(prettyError.render(err))
  finalHandler(req, res)(err)
})

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
