//type query, with key users points to another type User, and demands it returns as array.
//type User returns a username and password, both of types string. Inside of resolvers we need a users key
//that points to a function that goes and fetches that data and returns the types that fit the demanded Schema, (Use
const schema = `
	type Query {
    users: [User]
    singleUser(username: String): User
    getAllTopics: [Topic]
    getAllComments: [Comment]
    getASingleComment(text: String): Comment
    getASingleTopic(id: String!): Topic
  }
  type User {
    username: String
    password: String
    comments: [Comment]
  }
  type Topic {
    _id: String
    topic: String
    comments: [Comment]
  }
  type Comment {
    _id: String
    author: String
    topicId: String
    text: String
    netScore: Int
  }
  type Mutation {
    addTopic(topic: String ): Topic
    addComment(author: String!, topicId: String!, text: String!, netScore: Int): Comment
    addUser(username: String, password: String): User
    updatePassword(username: String, newPassword: String): User
    deleteUser(username: String, password: String): User
    increaseLikes(_id: String): Comment
  }
  schema {
    query: Query
    mutation: Mutation
	}
`;



module.exports = schema;