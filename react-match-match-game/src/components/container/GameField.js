
import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import Card from '../presentational/Card.js';
import Description from '../presentational/Description.js';

const GameField = (props) => {
    return (
        <div className="game-field">
            {props.game.gameState == 'description' && <Description/>}
            {props.game.gameState == 'game' && <Card/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return (
        {game: state.game}
    )
}

export default connect(mapStateToProps)(GameField);