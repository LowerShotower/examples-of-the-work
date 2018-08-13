import React from 'react';
import { connect } from 'react-redux';
import UserModal from '../presentational/UserModal.js';

const RegistrationPage = (props) => (
    <UserModal
    />
);

const mapStateToProps = (state) => ({
    game: state.game
})

export default connect(mapStateToProps)(RegistrationPage);