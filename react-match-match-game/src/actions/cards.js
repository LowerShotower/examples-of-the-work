import uuid from 'uuid';

const count = 0
export const addCard = (
    {
        type = '-1',
        skirtType = '0'
    } = {}
) => ({
    type: 'CARD_ADD',
    card: {
        id: uuid(),
        type,
        skirtType,
        isOpened: false,
        isMatched: false,
        isDisabled: false,
        cardState: 'card'
    }
});

export const shuffleCards = () => ({
    type: 'CARDS_SHUFFLE'
});

export const clearCards = () => ({
    type: 'CARDS_CLEAR'
});
export const setAllCardsDisabled = () => ({
    type: 'CARDS_ALL_SET_DISABLED'
});
export const setAllCardsEnabled = () => ({
    type: 'CARDS_ALL_SET_ENABLED'
});

export const setCardState = (id, isOpened = false,isDisabled = false, isMatched = false) => ({
    type: 'CARD_SET_STATE',
    id: id,
    isOpened: isOpened,
    isMatched: isMatched,
    isDisabled: isDisabled

});
