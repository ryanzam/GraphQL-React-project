const { UserInputError } = require('apollo-server');
const Movie = require('../Models/Movie');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        movieCount: () => Movie.collection.countDocuments(),
        allMovies: async (root, args) => { 
            const movies = await Movie.find({}); 
            return movies;
        },
        findMovie: async(root, args) => {
            const movie = await Movie.findOne({ title: args.title });
            return movie;
        },
        findUser: async(root, args) => await User.findOne({name: args.name}),
        currentUser: async(root, args, context) => {
            return await context.currentUser
        }
    },
    Mutation: {
        addMovie: async (root, args) => {
            const movie = new Movie({...args});
            try{
                await movie.save();
            } catch(err) {
                throw new UserInputError(err.message, {invalidArgs: args})
            }
            return movie;
        },
        editMovie: async (root, args) => {
            const movie = await Movie.findOne({ title: args.title });
            try {
                await movie.save()
            } catch(err) {
                throw new UserInputError(err.message, {invalidArgs: args})
            }
            return movie;
        },
        createUser: (root, args) => {
            const user = new User({username: args.username})
            return user.save().catch((err) => {
                throw new UserInputError(err.message, { invalidArgs: args})
            })
        },
        signin: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if(!user || args.password !== "admin"){
                throw new UserInputError("wrong username/password");
            }

            const token = { 
                username : user.username,
                id: user._id
            }
            return {value: jwt.sign(token, process.env.JWT_SECRET)}
        }
    }
}