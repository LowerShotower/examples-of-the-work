import uuid from 'uuid';

const count = 0
export const addCard = (
    {
        url = "",
        number = '-1',
        skirt = '0'
    } = {}
) => ({
    type: 'ADD_CARD',
    expense: {
        id: uuid(),
        number,
        url,
        skirt
    }
});

export const shuffleCards = () => ({
    type: 'CARDS_SHUFFLE'
});
