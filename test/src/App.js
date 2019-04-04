import React, { Component } from 'react';
import './App.css';
import RegisterPageComponent from "./components/registerPage/registerPage";
import Route from "react-router-dom/es/Route";
import LoginPageComponent from "./components/loginPage/loginPage";
import ProfilePageComponent from "./components/profilePage/profilePage";



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact
               path='/'
               render={ () => <RegisterPageComponent/>}/>
          <Route exact
                 path='/login'
                 render={ () => <LoginPageComponent/>}/>
          <Route exact
                 path='/profile'
                 render={ () => <ProfilePageComponent/>}/>
      </div>
    );
  }
}

export default App;
