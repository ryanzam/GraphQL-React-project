import { gql } from '@apollo/client';

export const ALL_MOVIES = gql`
    query {
        allMovies {
            title
            year
            imdbRating
            director
            stars           
        }
    }
`
export const ADD_MOVIE = gql `
  mutation addMovie($title: String!, $year:Int!, $director: String, $rating:Float, $stars:[String]) {
    addMovie(title: $title, year: $year, director: $director, imdbRating: $rating, stars: $stars) {
      title: title
      year: year
      director: director
      imdbRating: imdbRating
      stars: stars
    }
  }
`
export const EDIT_MOVIE = gql `
  mutation editMovie($title: String!, $year:Int!, $director: String, $rating:Float, $stars:[String]) {
    editMovie(title: $title, year: $year, director: $director, imdbRating: $rating, stars: $stars) {
      title: title
      year: year
      director: director
      imdbRating: imdbRating
      stars: stars
    }
  }
  `