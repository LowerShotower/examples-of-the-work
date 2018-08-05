import React from 'react'
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {setUser} from '../../actions/user.js';
import UserForm from '../container/UserForm.js';

const UserModal = (props) => {

    return (
        <Modal
            isOpen={!!props.showUserModal}
            // onRequestClose={props.handleUserModal}
            contentLabel="User Modal"
            closeTimeoutMS={200}
            className="modal"
            ariaHideApp={false}
        >
        <UserForm
            user = {props.user}
            handleUserModal={props.handleUserModal}
            onSubmit = {(user) => {
                console.log(user);
                props.dispatch(setUser(user));
            }}
        />
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserModal);