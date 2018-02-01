import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class LogIn extends Component {

    state = {
        error: ''
    }

    onSubmit = (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        this.props.loginWithPassword({ email }, password, (err) => {
            if (err) {
                this.setState({ error: 'Unable to login. Check email or password.' });
            } else {
                this.setState({ error: '' });
            }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Log In</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" name="email" placeholder="Email" />
                        <input type="password" name="password" placeholder="Password" />
                        <button className="button">Log In</button>
                    </form>

                    <Link to="/signup">Need to create an account?</Link>
                </div>
            </div>
        );
    }
}


LogIn.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
}


export default createContainer(() => {
    return {
        loginWithPassword: Meteor.loginWithPassword    
    };
}, LogIn);