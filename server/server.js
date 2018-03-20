const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const { graphql } = require('graphql');
const server = require('http').Server(app);
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers  = require('./../controller/resolvers.js');
const typeDefs = require('./../controller/graphqlSchema.js');
const liveServer = require('./../liveql_modules/liveqlResponse.js')
liveServer.initialize(server);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})


app.use('*', cors({ origin: 'http://localhost:8080' }));
app.use('*', bodyParser.json());
app.use('*', bodyParser.urlencoded({extended: true}));

app.use('/graphql',  graphqlExpress({ 
  schema: schema,
  formatResponse(res){

    const query = `
    query { getAllTopics {
      _id
      topic
      comments {
        _id
        author
        topicId
        text
        netScore
      }} 
    }`;

    graphql(schema, query)
      .then(data => {
        liveServer.io.sockets.emit('triggerRefresh', data)
    })
    return res;
  }
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(3000, () => console.log('GraphQL is now running on http://localhost:3000'));

app.use(express.static(__dirname + './..public')); //loads bundle
