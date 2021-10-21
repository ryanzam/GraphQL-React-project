const { ApolloServer, gql, UserInputError } = require('apollo-server');

let topmovies = [
    {
        title: "The Shawshank Redemption",
        year: 1994,
        imdbRating: 9.2,
        director: "Frank Darabont",
        stars: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
    },
    {
        title: "The Godfather",
        year: 1972,
        imdbRating: 9.1,
        director: "Francis Ford Coppola",
        stars: ["Robert De Niro", "All Pacino", "Robert Duvall"]
    },
    {
        title: "The Godfather: Part II",
        year: 1974,
        imdbRating: 9.0,
        director: "Frank Darabont",
        stars: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
    },
    {
        title: "The Dark Knight",
        year: 2008,
        imdbRating: 9.0,
        director: "Christopher Nolan",
        stars: ["Chiristan Bale", "Heath Ledger"]
    },
    {
        title: "12 Angry Men",
        year: 1957,
        imdbRating: 8.9,
        director: "Sidney Lumet",
        stars: ["Henry Fonda", "Martin Balsam"]
    },
]

const typeDefs = gql`
                    type Movie {
                        title: String!
                        year: Int!
                        imdbRating: Float
                        director: String
                        stars: [String]
                    }
                    type Query{
                        movieCount: Int!
                        allMovies: [Movie!]!
                        findMovie(title: String!): Movie
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
                    }
                `     

const resolvers = {
    Query: {
        movieCount: () => topmovies.length,
        allMovies:() => topmovies,
        findMovie:(root, args) => topmovies.find(m => m.title === args.title)
    },
    Mutation: {
        addMovie:(root, args) => {
            if(topmovies.find(m => m.title === args.title)){
                throw new UserInputError("The movie is already added", {
                    invalidArgs: args.title
                })
            }
            const movie = {...args}
            topmovies = topmovies.concat(movie)
            return movie
        },
        editMovie: (root, args) => {
            const movie = topmovies.find(m => m.title === args.title)
            if(!movie) { return null }
            const updatedMovie = {...movie, title: args.title, year: args.year, 
                imdbRating: args.imdbRating, director: args.director, stars: args.stars}
            allMovies.map(m => m.title === args.title ? updatedMovie : m);
            return updatedMovie
        }
    }
}

const server = new ApolloServer({
    typeDefs, 
    resolvers
});

server.listen().then(({url})=> console.log(`Server running @ ${url}`));



