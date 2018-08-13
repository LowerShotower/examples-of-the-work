import React from 'react'
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {setUser} from '../../actions/user.js';
import UserForm from '../container/UserForm.js';
import { setLoggedIn } from '../../actions/game.js';

const UserModal = (props) => {

    return (
        <Modal
            isOpen={true}
            // onRequestClose={props.handleUserModal}
            contentLabel="User Modal"
            closeTimeoutMS={200}
            className="modal"
            ariaHideApp={false}
        >
        <UserForm
            user = {props.user}
            onSubmit = {(user,emailValid,nameValid,formValid) => {
                console.log(user);
                props.dispatch(setUser(user));
                props.dispatch(setLoggedIn(true));
            }}
        />
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game,
    }
}

export default connect(mapStateToProps)(UserModal);