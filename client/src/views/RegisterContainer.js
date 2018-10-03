import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { newAccount } from "../actions.js";

const initFormState = {
  username: "",
  email: "",
  password: ""
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = initFormState;
    this.registerAccount = this.registerAccount.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  registerAccount(e) {
    e.preventDefault();
    this.props.newAccount(this.state);
    this.props.history.push("/login");
  }

  handleFormInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.registerAccount}>
          <label>
            <p>Email address</p>
            <input
              type="text"
              name="email"
              required={true}
              onChange={this.handleFormInput}
              value={this.state.email}
            />
          </label>
          <label>
            <p>Username</p>
            <input
              type="text"
              name="username"
              required={true}
              onChange={this.handleFormInput}
              value={this.state.username}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              required={true}
              onChange={this.handleFormInput}
              value={this.state.password}
            />
          </label>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  newAccount: PropTypes.func.isRequired
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {};
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    newAccount: account => dispatch(newAccount(account))
  };
}

// Connected Component
const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);

export default RegisterContainer;
