export const setFName = (fName = 'noname') => ({
    type: 'SET_FIRST_NAME',
    fName
})
export const setLName = (lName = 'noname') => ({
    type: 'SET_LAST_NAME',
    lName
})

export const setEmail = (email = 'noemail') => ({
    type: 'SET_EMAIL',
    email
})
export const setPoints = (points) => ({
    type: 'SET_POINTS',
    points
})
export const setNameValid = (nameValid) => ({
    type: 'SET_NAME_VALID',
    nameValid
})
export const setEmailValid = (emailValid) => ({
    type: 'SET_EMAIL_VALID',
    emailValid
})
export const setFormValid = (formValid) => ({
    type: 'SET_FORM_VALID',
    formValid
})

export const setUser = ({ fName = 'nnm', lName = 'nnm', email = 'nml', emailValid=false, nameValid=false, formValid=false, } = {}) => ({
    type: 'SET_USER',
    user: {
        fName,
        lName,
        email,
        emailValid,
        nameValid,
        formValid
    }
})