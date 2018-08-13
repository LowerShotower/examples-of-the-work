export const setGameState = (gameState = 'description') => ({
    type: 'SET_GAME_STATE',
    gameState
})

export const setLoggedIn = (loggedIn = false) => ({
    type: 'SET_LOGGEDIN',
    loggedIn
})

export const setScoreWasLoaded = (scoreWasLoaded = false) => ({
    type: 'SET_SCORE_WAS_LOADED',
    scoreWasLoaded
})

export const displayTheError = (errorMessage = '') => ({
    type: 'DISPLAY_THE_ERROR',
    errorMessage
})
