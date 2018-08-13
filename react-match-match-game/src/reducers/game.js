const gameDefaultState = {
    isPlaying: false,
    gameState: "description",
    loggedIn:false,
    scoreWasLoaded: false,
    errorMessage: ''
}

export default (state = gameDefaultState, action) => {
    switch (action.type) {
        case 'GAME_TOGGLE':
            return {
                ...state,
                isPlaying: state.isPlaying != action.isPlaying ? action.isPlaying : state.isPlaying,
            };
        case 'GAME_STOP':
            return {
                ...state,
                isPlaying: false,
            };
        case 'SET_GAME_STATE':
            return {
                ...state,
                gameState: action.gameState,
            };
        case 'SET_LOGGEDIN':
            return {
                ...state,
                loggedIn: action.loggedIn
            };
        case 'SET_SCORE_WAS_LOADED':
            return {
                ...state,
                scoreWasLoaded: action.scoreWasLoaded
            };
        case 'DISPLAY_THE_ERROR':
            return {
                ...state,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};