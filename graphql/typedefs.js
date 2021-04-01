const { gql } = require("apollo-server");

module.exports = gql`
    type Order{
        id: ID!
        item: String!
        createdAt: String!
        username: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        address: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        address: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getOrders: [Order]
        getOrder(orderId: ID!): Order
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!):User!
        createOrder(item: String!):Order!
        deleteOrder(orderId: ID!): String!
    }

`;