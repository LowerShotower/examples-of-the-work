const gameDefaultState = {
    isPlaying: false,
    gameState: "description",
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
        default:
            return state;
    }
};