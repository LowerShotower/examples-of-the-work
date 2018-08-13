import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { setGameState } from "../../actions/game.js";
import { addCard, shuffleCards, clearCards } from '../../actions/cards.js';
import DifficultySelectMenu from '../presentational/DifficultySelectMenu.js';
import SkirtSelectMenu from '../presentational/SkirtSelectMenu.js';



class GameMenu extends Component {
    constructor(props) {
        super(props)


    }

    instantiateDeck = (difficulty, skirtType) => {
        const singlePackNumberOfPairs = 1;
        this.props.dispatch(clearCards());
        const numberOfPairs = (+difficulty + 1) * singlePackNumberOfPairs;
        for (let i = 0; i < numberOfPairs; i++) {
            this.props.dispatch(addCard({ type: i, skirtType: skirtType }));
            this.props.dispatch(addCard({ type: i, skirtType: skirtType }));
        }
        this.props.dispatch(shuffleCards());
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    onStartClick = () => {
        this.instantiateDeck(this.props.settings.difficulty, this.props.settings.skirtType);
        this.props.dispatch(setGameState('game'));
    }


    render() {
        return (
            <form className="game-menu" onSubmit={this.onSubmit} >
                <DifficultySelectMenu />
                <SkirtSelectMenu />
                <Link to="/register">
                    <button className="button" >Change user</button>
                </Link>

                <Link to="/game">
                    <button className="button" onClick={this.onStartClick} >StartGame</button>
                </Link>
            </form>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        game: state.game,
        settings: state.settings,
        cards: state.cards
    };
};

export default connect(mapStateToProps)(GameMenu);