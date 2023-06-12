const { ApolloServer, gql } = require("apollo-server");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { connection } = require("./config/Db");
const { profileResolvers } = require("./resolvers/profileResolver");
const { profileTypeDefs } = require("./schemaGQL/ProfileSchema");




const server = new ApolloServer({
    typeDefs : profileTypeDefs,
    resolvers : profileResolvers,
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground ]
})

server.listen('8000', async (req, res) => {
    console.log("Server listening on 8000");
    try {
        await connection;
        console.log("Connected to DB");
    }
    catch (err) {
        console.log("Problem in DB connection ", err.message);
    }
    // console.log("Server listening on 8080");
});