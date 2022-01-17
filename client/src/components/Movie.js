import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const GET_MOVIE = gql`
    query searchMovieByTitle($title: String!) {
        findMovie(title: $title) {
            year
            imdbRating
        }
    }
`

const Movie = ({movie}) => {
    const [getMovie, result] = useLazyQuery(GET_MOVIE);
    const [more, setMore] = useState(null);

    const showMore = (title) => {
      getMovie({variables: { title: title}});
    }

    useEffect(() => {
      if(result.data) {
        setMore(result.data.findMovie)
      }
    }, [result]);

    if(result.called && result.loading) return <LoadingSpinner />

    const renderDetails = () => {
      return (<>
          <a href="#">imdbRating : {movie.imdbRating}</a>
          <a href="#"> year : {movie.year}</a>
          <a onClick={() => setMore(null)} class="waves-effect waves-light btn">
          <i class="material-icons left">chevron_left</i>less</a>
      </>)
    }

      return(<div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title"><i className="material-icons">satellite</i> {movie.title}</span>
            <p>Director : {movie.director}</p>
            <p>Starts : {movie.stars.join(" * ")}</p>
          </div>
          <div className="card-action">
          {more === null 
            ? <a onClick={() => showMore(movie.title)} class="waves-effect waves-light btn">
            <i class="material-icons left">chevron_right</i>more</a>
            : renderDetails()
          }
          </div>
        </div>
      </div>)
}

export default Movie;