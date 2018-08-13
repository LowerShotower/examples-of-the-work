import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Score from '../presentational/Score.js';
import { downloadScore, uploadScore, setScoreData } from '../../actions/score.js';
import { setScoreWasLoaded } from '../../actions/game.js';
import ErrorBlock from '../presentational/ErrorBlock.js';

class ScorePage extends React.Component {

    componentDidMount = () => {
        this.props.dispatch(uploadScore(this.props.user));
        console.log(this.props.user)
        this.props.dispatch(setScoreWasLoaded(false));
    }

    render() {
        return (
            <div className="game-field"  >
                <div>
                    {(this.props.game.scoreWasLoaded) ? (<Score scoreData={this.props.score} points = {this.props.user.points} />) :
                        (this.props.game.errorMessage.toString().length > 0 ?
                            (<ErrorBlock dispatch={() => { this.props.dispatch(uploadScore(this.props.user)); }} />) : (<p>Wait for a minute</p>))}
                    {console.log(this.props.game.errorMessage.toString().length)}
                    <Link to="/"><button className="button">Go To main page</button></Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    score: state.score,
    game: state.game,
    user: state.user
})

export default connect(mapStateToProps)(ScorePage);