import { shuffle, map, replace } from 'lodash-es';
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
        case 'CARDS_CLEAR':
            return [];
        case 'CARDS_ALL_SET_DISABLED':
            return map(state, (o) => {
                if (o.isDisabled === false) {
                    o.isDisabled = true;
                    o.cardState += ' disabled';
                };
                return o;
            });
        case 'CARDS_ALL_SET_ENABLED':
            return map(state, (o) => {
                if (o.isDisabled === true && o.isMatched == false) {
                    o.isDisabled = false;
                    o.cardState = replace(o.cardState, ' disabled', '');
                };
                return o;
            });
        case 'CARD_SET_STATE':
            return map(state, (o) => {
                if (o.id == action.id) {
                    o.isOpened = action.isOpened;
                    o.isDisabled = action.isDisabled;
                    o.isMatched = action.isMatched;
                    console.log(o.isOpened, o.isDisabled, o.isMatched);
                    if (o.isOpened === true) {
                        o.cardState += ' open';
                        o.cardState = replace(o.cardState, ' close', '');
                    }
                    else {
                        o.cardState = replace(o.cardState, ' open', ' close');
                    }
                    o.isMatched === true ? o.cardState += ' match' : o.cardState = replace(o.cardState, ' match', '');
                    o.isDisabled === true ? o.cardState += ' disabled' : o.cardState = replace(o.cardState, ' disabled', '');
                }
                return o;
            });

        default:
            return state;
    }
};