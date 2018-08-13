import React, {  Fragment } from 'react'
import { connect } from 'react-redux';
import { setSkirt } from '../../actions/settings.js';

const SkirtSelectMenu = (props) => {
    return (
        <Fragment>
            <select
                className = "button"
                value={props.settings.skirt}
                onChange={(e) => {
                    props.dispatch(setSkirt(e.target.value));
                }}
            >
                <option value="0">Blue</option>
                <option value="1">Green</option>
                <option value="2">Yelllow</option>
            </select>
        </Fragment>
    )
}

SkirtSelectMenu.propTypes = {

}

const mapStateToProps = (state) => {
    return {
      settings: state.settings
    };
  };
  
  export default connect(mapStateToProps)(SkirtSelectMenu);