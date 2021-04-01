const orderResolvers = require('./orders');
const userResolvers = require('./users');

module.exports = {
    Query:{
        ...orderResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,

        ...orderResolvers.Mutation,




    }
}