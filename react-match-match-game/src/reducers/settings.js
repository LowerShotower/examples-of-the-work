
const settingsDefaultState = {
    difficulty: 'easy',
    skirt: '0',
    startTime: 0,
    endTime: undefined
};

export default (state = settingsDefaultState, action) => {
    switch (action.type) {
        case "SET_DIFFICULTY":
            return {
                ...state,
                difficulty: action.difficulty
            };
        case "SET_SKIRT":
            return {
                ...state,
                skirt: action.skirt
            };
        default:
            return state;
    }
};