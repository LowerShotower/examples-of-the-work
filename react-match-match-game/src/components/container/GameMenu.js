import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { setGameState } from "../../actions/game.js";
import DifficultySelectMenu from '../presentational/DifficultySelectMenu.js';
import SkirtSelectMenu from '../presentational/SkirtSelectMenu.js';
import UserModal from '../presentational/UserModal.js';



class GameMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showUserModal: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    onStartClick = () => {
        this.props.dispatch(setGameState('game'));
    }

    onChangeUserClick = () => {
        this.setState({ showUserModal: true });
    }

    handleUserModal = () => {
        this.setState({ showUserModal: false });
    }

    render() {
        return (
            <form className="game-menu" onSubmit={this.onSubmit} >
                <DifficultySelectMenu />
                <SkirtSelectMenu />
                <button className="button" onClick={this.onChangeUserClick}>Change user</button>
                <button className="button" onClick={this.onStartClick} >Start game</button>
                <UserModal
                    showUserModal={this.state.showUserModal}
                    handleUserModal={this.handleUserModal}
                />
            </form>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        game: state.game
    };
};

export default connect(mapStateToProps)(GameMenu);