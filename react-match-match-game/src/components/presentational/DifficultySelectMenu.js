import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { setDifficulty } from '../../actions/settings.js';

const DifficultySelectMenu = (props) => (
  <Fragment>
    <select
      className = "button"
      value={props.settings.difficulty}
      onChange={(e) => {
        props.dispatch(setDifficulty(e.target.value));
      }}
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </Fragment>
);

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  };
};

export default connect(mapStateToProps)(DifficultySelectMenu);