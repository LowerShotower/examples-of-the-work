

const userDefaultState = {
    fName: "noname",
    lName: "noname",
    email: 'none',
}

export default (state = userDefaultState, action) => {
    switch (action.type) {
        case 'SET_FIRST_NAME':
            return {
                ...state,
                fName: action.fName
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                lName: action.lName
            };
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.email
            };
        case 'SET_USER':
            return {
                ...state,
                ...action.user
            };
        default:
            return state;
    }
};