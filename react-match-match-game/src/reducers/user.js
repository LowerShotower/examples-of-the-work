

const userDefaultState = {
    fName: "noname",
    lName: "noname",
    email: 'none@example.com',
    points: 0,
    emailValid: false,
    nameValid: false,
    formValid: true
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
        case 'SET_POINTS':
            return {
                ...state,
                points: action.points
            };
        case 'SET_FORM_VALID':
            return {
                ...state,
                formValid: action.formValid
            };
        case 'SET_EMAIL_VALID':
            return {
                ...state,
                email: action.emailValid
            };
        case 'SET_NAME_VALID':
            return {
                ...state,
                nameValid: action.nameValid
            };
        default:
            return state;
    }
};