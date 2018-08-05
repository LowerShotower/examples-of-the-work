import { shuffle } from 'lodash-es';
const cardsDefaultState = [

];

export default (state = cardsDefaultState, action) => {
    switch (action.type) {
        case 'CARD_ADD':
            return [
                ...state,
                action.card
            ];
        case 'CARDS_SHUFFLE':
            return shuffle(state);
        default:
            return state;
    }
};