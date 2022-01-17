import React, { useState } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Footer from './components/Footer';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import AddMovie from './components/AddMovie';
import M from 'materialize-css';

function App() {
  const handleErrors = (em) => { 
    M.toast({html: em, classes: 'rounded error'})
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar/>

        <Switch>
          <Route path="/add">
          <div className="container">
            <AddMovie handleErr={handleErrors}/>
          </div>
          </Route>
          <Route path="/">
          <div className="container">
            <Movies />
          </div>
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
