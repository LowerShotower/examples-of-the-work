export const setFName = (fName = 'noname') => ({
    type: 'SET_FIRST_NAME',
    fName
})
export const setLName = (lName = 'noname') => ({
    type: 'SET_LAST_NAME',
    lName
})

export const setEmail = (email = 'noemail') => ({
    type: 'SET_email',
    email
})

export const setUser = ({ fName = 'nnm', lName = 'nnm', email = 'nml' } = {}) => ({
    type: 'SET_USER',
    user: {
        fName,
        lName,
        email
    }
})