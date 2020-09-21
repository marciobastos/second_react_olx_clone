const initialState = {
    email: ''
}

export default (state = initialState, action) => {

    if(action.payload === 'SET_EMAIL'){
        //copia a state e altera o email;
        return {...state, email: action.payload.email};
    }

    return state;
}