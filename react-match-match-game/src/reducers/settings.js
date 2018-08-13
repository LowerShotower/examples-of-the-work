
const settingsDefaultState = {
    difficulty: '0',
    skirtType: '0',
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
            console.log(action.skirtType);
            return {
                ...state,
                skirtType: action.skirtType
            };
        default:
            return state;
    }
};