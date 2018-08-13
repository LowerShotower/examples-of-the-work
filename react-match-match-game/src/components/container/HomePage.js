import React from 'react';
import { connect } from 'react-redux';
import Description from '../presentational/Description.js';

const HomePage = (props) => (
    <div className="game-field"  >
        { <Description />}
    </div>
);

const mapStateToProps = (state) => ({
    game: state.game
})

export default connect(mapStateToProps)(HomePage);