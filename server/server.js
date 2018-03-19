const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const server = require('http').Server(app);
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers  = require('./../controller/resolvers.js');
const typeDefs = require('./../controller/graphqlSchema.js');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})


app.use('*', cors({ origin: 'http://localhost:8080' }));
app.use('*', bodyParser.json());
app.use('*', bodyParser.urlencoded({extended: true}));

app.use('/graphql',  graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(3000, () => console.log('GraphQL is now running on http://localhost:3000'));

app.use(express.static(__dirname + './..public')); //loads bundle
