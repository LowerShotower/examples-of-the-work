

const scoreDefaultState = []

export default (state = scoreDefaultState, action) => {
    switch (action.type) {
        
        case 'SET_SCORE_ELEMENT':
            return[ 
                ...state,
                action.scoreEl
            ];
        case 'SCORE_DATA_SET':
            return [
                ...action.scoreData
            ];
        default:
            return state;
    }
};