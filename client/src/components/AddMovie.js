import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MOVIE, ALL_MOVIES } from "../Queries/Queries";
import M from 'materialize-css';

const AddMovie = ({handleErr}) => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState(null)
    const [director, setDirector] = useState('')
    const [imdbRating, setImdbRating] = useState('')
    const [stars, setStars] = useState([]);

    const [addMovie] = useMutation(ADD_MOVIE, {
      refetchQueries: [{query: ALL_MOVIES}],
      onError: (err) => {
        handleErr(err);
      }
    });

    const onSubmit = (e) => {
        e.preventDefault()
        const result = addMovie({variables: {title, year, director, imdbRating, stars}});
        result.then(data => {
          M.toast({html: "Movie : " +data.data.addMovie.title + " is added!", classes: 'rounded'});
          setTitle('')
          setYear('')
          setDirector('')
          setImdbRating('')
          setStars('')
        }).catch(err => {
          M.toast({html: err, classes: 'rounded error'})
        });
    }

    return(<div className="row">
        <h1>Add a new movie</h1>
    <form className="col s12" onSubmit={onSubmit}>
      <div className="row">
        <div className="input-field col s12">
          <input id="title" type="text" className="validate" value={title}
            onChange={({ target }) => setTitle(target.value)}/>
          <label for="title">Title</label>
          <span className="helper-text" data-error="wrong" data-success="right">Add movie title</span>
        </div>
        <div className="input-field col s12">
          <input id="year" type="number" className="validate" value={year}
            onChange={({ target }) => setYear(Number(target.value))}/>
          <label for="year">Year</label>
          <span className="helper-text" data-error="wrong" data-success="right">Released date</span>
        </div>
        <div className="input-field col s12">
          <input id="dir" type="text" className="validate" value={director}
            onChange={({ target }) => setDirector(target.value)}/>
          <label for="dir">Director</label>
          <span className="helper-text" data-error="wrong" data-success="right">directed by</span>
        </div>
        <div className="input-field col s12">
          <input id="rat" type="number" className="validate" placeholder="1.0" step="0.1" 
          min="0" max="10" value={imdbRating} onChange={({ target }) => setImdbRating(target.value)}/>
          <label for="rat">Rating</label>
          <span className="helper-text" data-error="wrong" data-success="right">Released date</span>
        </div>
        <div className="input-field col s12">
          <input id="star" type="text" className="validate" value={stars} 
                onChange={({ target }) => setStars(target.value)}/>
          <label for="star">Stars</label>
          <span className="helper-text" data-error="wrong" data-success="right">Stars</span>
        </div>
      </div>
      <button type="submit" class="btn-floating btn-large waves-effect waves-light blue-grey darken-3"><i class="material-icons">add</i></button>
    </form>
  </div>)
}

export default AddMovie;