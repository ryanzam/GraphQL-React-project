import React from "react";
import { useQuery } from '@apollo/client';
import LoadingSpinner from "./LoadingSpinner";
import Movie from "./Movie";
import { ALL_MOVIES } from "../Queries/Queries";

const Movies = ()=> {
    const results = useQuery(ALL_MOVIES);

    if (results.loading) return <LoadingSpinner />

    return(<div className="row">
            {results.data.allMovies.map((movie, key) => 
                    <Movie key={key} movie={movie}/>)
            }
        </div>)
}

export default Movies;