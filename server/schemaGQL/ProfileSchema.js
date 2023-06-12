const { ApolloServer, gql } = require("apollo-server");

const profileTypeDefs = gql`
    type Query {
        getAllProfiles(orderBy: globalOrderBy, searchString: String, rows: Int, page: Int) : ProfileList!
        getProfileById(id : String) : Profile!
    }

    type Mutation {
        createProfile(first_name: String!, last_name: String!, email: String!, is_verified: Boolean!, image_url: String!, description: String!) : Profile
        updateProfile(id: String, first_name: String!, last_name: String!, email: String!, is_verified: Boolean!, image_url: String!, description: String!) : Profile
        deleteProfile(id: String) : String
    }

    
    input globalOrderBy {
        key : String
        sort : String
    }

    type ProfileList {
        size: Int!
        profiles: [Profile!]!
    }

    type Profile {
        id:ID
        first_name:String
        last_name:String
        email:String
        is_verified:Boolean
        image_url:String
        description:String
    }

`;

module.exports = {
    profileTypeDefs
}