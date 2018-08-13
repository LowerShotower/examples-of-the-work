import React, { Component, PropTypes, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { FormErrors } from '../presentational/FormErrors.js';

class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fName: props.user ? props.user.fName : 'enter first name',
            lName: props.user ? props.user.lName : 'enter last name',
            email: props.user ? props.user.email : 'enter email',
            formErrors: { email: '', name: '' },
            emailValid: props.user.emailValid,
            nameValid:props.user.nameValid,
            formValid: props.user.formValid
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }


    onSubmit = (e) => {

        this.props.onSubmit({
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            emailValid: this.state.emailValid,
            nameValid: this.state.nameValid,
            formValid: this.state.formValid,
        });
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'fName':
            case 'lName':
                nameValid = value.length >= 2;
                fieldValidationErrors.name = nameValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            nameValid: nameValid
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({ formValid: this.state.emailValid && this.state.nameValid });
    }

    render() {
        return (
            <Fragment>
                <form  >
                    <fieldset className="account-info ">
                        <FormErrors formErrors={this.state.formErrors} />
                        <label>
                            First Name
                        <input type="text" name="fName" onChange={this.handleUserInput} placeholder={this.state.fName}  />
                        </label>
                        <label>
                            Last Name
                        <input type="text" name="lName" onChange={this.handleUserInput} placeholder={this.state.lName}  />
                        </label>
                        <label>
                            Email
                        <input type="email" name="email" onChange={this.handleUserInput} placeholder={this.state.email}  />
                        </label>
                    </fieldset>
                    <fieldset className="account-action">
                    
                        <Link to="/" onClick={this.state.formValid ?( e =>{ this.onSubmit() }):(e =>{e.preventDefault(); console.log('he')})} ><button className="btn" onClick={this.state.formValid ?( e =>{ console.log('hello'); }):(e =>{e.preventDefault(); console.log('hell')})}    >Submit</button></Link>
                    </fieldset>
                </form>
            </Fragment>
        )
    }
}

UserForm.propTypes = {

}

export default UserForm