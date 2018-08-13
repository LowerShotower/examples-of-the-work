import React from 'react';
import { connect } from 'react-redux';
import { every } from 'lodash-es';
import Card from '../presentational/Card.js';
import { setCardState, setAllCardsDisabled, setAllCardsEnabled } from '../../actions/cards.js';
import { setPoints } from '../../actions/user.js';




class GamePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: 0,
            endTime: 0
        }
    }
    componentDidMount = () => {
        this.setState({ startTime: Date.now() })
        console.log(this.state.startTime);

    }

    manageWithPair = (tArr) => {
        if (tArr[0].type == tArr[1].type) {
            tArr.forEach((card) => { this.props.dispatch(setCardState(card.id, false, true, true)) })
        } else
            if (tArr[0].type != tArr[1].type) {
                tArr.forEach((card) => { this.props.dispatch(setCardState(card.id, false, false, false)) })
            }
        if (every(this.props.cards, 'isMatched')) {
            this.setState({ endTime: Math.floor((Date.now() - this.state.startTime)/1000) });
            this.props.dispatch(setPoints(100000-this.state.endTime*4))
            console.log(this.props.user.points)
            this.props.history.push('/score')
        };
    }

    ternCard = (id) => {
        return new Promise((resolve, reject) => {
            this.props.dispatch(setCardState(id, true, true));
            let tArr = this.props.cards.filter((card) => (card.isOpened));
            if (tArr.length == 2) {
                this.props.dispatch(setAllCardsDisabled());
                setTimeout(() => { resolve(id) }, 1000);
            }
        }).then((id) => {
            let tArr = this.props.cards.filter((card) => (card.isOpened));
            tArr.length == 2 ? this.manageWithPair(tArr) : null;
            this.props.dispatch(setAllCardsEnabled());

        })
    }

    onCardClick = (id) => {
        this.ternCard(id);
    }


    render() {
        return (<div className="game-field"  >
            {
                this.props.cards.map((card, index) => {
                    return <Card
                        type={card.type}
                        skirtType={card.skirtType}
                        key={card.id}
                        id={card.id}
                        onCardClick={this.onCardClick}
                        className={card.cardState}
                    />
                })
            }
        </div>)
    }
}

const mapStateToProps = (state) => ({
    cards: state.cards,
    game: state.game,
    user: state.user
})

export default connect(mapStateToProps)(GamePage);