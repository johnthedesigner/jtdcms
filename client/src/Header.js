import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logOut } from "./actions.js";
import { sessionUtils } from "./stateUtils";

class Header extends Component {
  render() {
    const SessionControls = () => {
      if (sessionUtils.loggedIn(this.props.session)) {
        return (
          <a onClick={this.props.logOut}>
            Log out{" "}
            {this.props.session.user ? this.props.session.user.username : true}
          </a>
        );
      } else {
        return (
          <span>
            <Link to="/login">Login</Link>
            <span> | </span>
            <Link to="/register">Register</Link>
          </span>
        );
      }
    };

    return (
      <nav>
        <Link to="/">Hello World</Link>
        <span> | </span>
        <Link to="/todos">Todo List</Link>
        <span> | </span>
        <SessionControls />
      </nav>
    );
  }
}

Header.propTypes = {
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
    logOut: () => dispatch(logOut())
  };
}

// Connected Component
const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
