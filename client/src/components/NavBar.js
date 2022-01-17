import React from "react";
import {Link} from "react-router-dom"

const NavBar = (props)=>{
    return(<nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo"><i className="large material-icons">subscriptions</i>topMovies</a>

          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><Link to="/">All Movies</Link></li>
            <li><Link to="/add">Add new Movie</Link></li>
          </ul>
        </div>
      </nav>)
}

export default NavBar;