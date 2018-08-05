import { createStore, combineReducers} from 'redux';
import settings from '../reducers/settings.js';
import user from '../reducers/user.js';
import game from '../reducers/game.js';

export default () => {
    const store = createStore(
        combineReducers({
            settings,
            user,
            game
        })
    );
    return store;
};
