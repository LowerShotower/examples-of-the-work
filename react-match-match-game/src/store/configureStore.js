import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import settings from '../reducers/settings.js';
import user from '../reducers/user.js';
import game from '../reducers/game.js';
import cards from '../reducers/cards.js';
import score from '../reducers/score.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ; 

export default () => {
    const store = createStore(
        combineReducers({
            settings,
            user,
            game,
            cards,
            score
        })
        ,composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
