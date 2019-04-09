import React, {Component} from 'react';
import './App.css';
import AuthPage from "./components/AuthPage/AuthPage";
import {Route, Switch} from "react-router-dom";
import ProfilePageContainer from "./containers/ProfilePageContainer";
import RegisterPageContainer from "./containers/RegisterPageContainer";
import AuthPageContainer from "./containers/AuthPageContainer";




class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact
                           path='/'
                           render={() => <RegisterPageContainer/>}/>
                    <Route exact
                           path='/auth'
                           render={() => <AuthPageContainer/>}/>
                    <Route exact
                           path='/profile'
                           render={() => <ProfilePageContainer/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
