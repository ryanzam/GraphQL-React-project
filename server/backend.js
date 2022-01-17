const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const resolvers = require('./GraphQL/resolvers')
const typeDefs = require('./GraphQL/typeDefs')
require('dotenv').config()

const MONGODB_URI = Process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(()=> {
        console.log("connected to MongoDB")
    }).catch((err) => {
        console.log("error connecting to MongoDB", err.message)
    })

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if(auth && auth.toLowerCase().startsWith('bearer ')){
            const decodedToken = jwt.verify( auth.substring(7), process.env.JWT_SECRET)

            const currentUser = await User.findById(decodedToken.id);
            return {currentUser}
        }
    }
});

server.listen().then(({url})=> console.log(`Server running @ ${url}`));



