import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logIn } from "../actions.js";

const initFormState = {
  username: "",
  password: ""
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = initFormState;
    this.logInUser = this.logInUser.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  logInUser(e) {
    e.preventDefault();
    this.props.logIn(this.state);
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
        <form onSubmit={this.logInUser}>
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
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {};
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    logIn: user => dispatch(logIn(user))
  };
}

// Connected Component
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginContainer;
