import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logIn } from "../actions.js";
import { sessionUtils } from "../stateUtils";
import ConditionalRedirect from "../ConditionalRedirect";

const initFormState = {
  username: "",
  password: ""
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = initFormState;
    this.logInAccount = this.logInAccount.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  logInAccount(e) {
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
        <ConditionalRedirect
          condition={sessionUtils.loggedIn(this.props.session)}
          redirectTo="/todos"
        />
        <form onSubmit={this.logInAccount}>
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
  logIn: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    session: state.session
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    logIn: account => dispatch(logIn(account))
  };
}

// Connected Component
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginContainer;
