const { gql } = require('apollo-server');

module.exports = gql`
                    type Movie {
                        title: String!
                        year: Int!
                        imdbRating: Float
                        director: String
                        stars: [String]
                    }
                    type User{
                        username: String!
                        id: ID!
                    }
                    type Token{
                        value: String!
                    }
                    type Query{
                        movieCount: Int!
                        allMovies: [Movie!]!
                        findMovie(title: String!): Movie
                        findUser(username: String!): User
                        currentUser: User
                    }
                    type Mutation{
                        addMovie(
                            title: String!
                            year: Int!
                            imdbRating: Float
                            director: String
                            stars: [String]
                        ): Movie
                        editMovie(
                            title: String
                            year: Int
                            imdbRating: Float
                            director: String
                            stars: [String]
                        ): Movie
                        createUser(
                            username: String!
                            ): User
                        signin(
                            username: String!
                            password: String!
                            ): Token
                    }
                `     