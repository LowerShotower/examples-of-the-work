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
      <option value="0">Easy</option>
      <option value="1">Medium</option>
      <option value="2">Hard</option>
    </select>
  </Fragment>
);

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  };
};

export default connect(mapStateToProps)(DifficultySelectMenu);