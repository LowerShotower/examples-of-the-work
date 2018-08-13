import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import GameMenu from '../components/container/GameMenu.js';
import HomePage from '../components/container/HomePage.js';
import GamePage from '../components/container/GamePage.js';
import ScorePage from '../components/container/ScorePage.js';
import RegistrationPage from '../components/container/RegistrationPage.js';
import NotFoundPage from '../components/container/NotFoundPage.js';

const AppRouter = (props) => (
    <BrowserRouter>
        <div>
            <GameMenu />
            <Switch>
                <Route exact path="/" render={() =>{
                    console.log(props.game.loggedIn)
                return (
                    !props.game.loggedIn ? (
                        <Redirect to="/register" />
                    ) : (
                        <HomePage/>
                    )
                )}
                } />
                <Route path="/register" component={RegistrationPage} />
                <Route path="/score" component={ScorePage} />
                <Route path="/game" component={GamePage} />
                <Route  component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

const mapStateToProps = (state) => {
    return ({
        game: state.game,
    })
}
export default connect(mapStateToProps)(AppRouter);