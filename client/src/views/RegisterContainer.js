import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { newUser } from "../actions.js";

const initFormState = {
  username: "",
  email: "",
  password: ""
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = initFormState;
    this.registerUser = this.registerUser.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  registerUser(e) {
    e.preventDefault();
    this.props.newUser(this.state);
    this.setState(initFormState);
  }

  handleFormInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.registerUser}>
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
  newUser: PropTypes.func.isRequired
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {};
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    newUser: user => dispatch(newUser(user))
  };
}

// Connected Component
const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);

export default RegisterContainer;
