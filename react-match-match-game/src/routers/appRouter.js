import React from 'react';
import { BrowserRouter, Switch, Link, NavLink, Route } from 'react-router-dom';

import GamePage from '../components/container/GamePage.js';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={GamePage} />
                {/* <Route  component={404Page}/> */}
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;