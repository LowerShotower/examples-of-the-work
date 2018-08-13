

import React, { Component } from 'react'

class Score extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <p>Congratulations!  Your Score is {this.props.points}</p>
                <table>
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.scoreData.map(({ username, email, score , _id} = scoreElement) => {
                            return (<tr key={_id}>
                                <td >{username}</td>
                                <td >{email}</td>
                                <td >{score}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

Score.propTypes = {

}

export default Score;