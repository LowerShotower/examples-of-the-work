import React, { Component, PropTypes, Fragment } from 'react'

class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fName: props.user ? props.user.fName : 'enter first name',
            lName: props.user ? props.user.fName : 'enter last name',
            email: props.user ? props.user.email : 'enter email',
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    onFNameChange = (e) => {
        const fName = e.target.value;
        this.setState(() => ({fName}));
    }

    onLNameChange = (e) => {
        const lName = e.target.value;
        this.setState(() => ({lName}));
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email
        });
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.onSubmit} >
                    <fieldset className="account-info ">
                        <label>
                            First Name
                        <input type="text" onChange={this.onFNameChange}  />
                        </label>
                        <label>
                            Last Name
                        <input type="text" name="lastName" onChange={this.onLNameChange}/>
                        </label>
                        <label>
                            Email
                        <input type="email" name="email" onChange={this.onEmailChange}/>
                        </label>
                    </fieldset>
                    <fieldset className="account-action">
                        <button className="btn" onClick={this.props.handleUserModal} >Login</button>
                    </fieldset>
                </form>
            </Fragment>
        )
    }
}

UserForm.propTypes = {

}

export default UserForm