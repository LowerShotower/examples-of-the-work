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
                <option value="0">Yelllow</option>
                <option value="1">Green</option>
                <option value="2">Blue</option>
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