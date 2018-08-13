import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ErrorBlock extends Component {
    render() {
        return (
            <div>
                <p>Failed To load Scoreboard from server</p>
                <button className="button" onClick = {this.props.dispatch} >Try To Reload</button>
            </div>
        )
    }
}

export default ErrorBlock;