import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router";

class ConditionalRedirect extends Component {
  render() {
    return (
      <Route
        render={() =>
          this.props.condition ? (
            <Redirect to={this.props.redirectTo} /> // if condition is met, redirect user
          ) : (
            true // do nothing
          )
        }
      />
    );
  }
}

ConditionalRedirect.propTypes = {
  condition: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired
};

export default ConditionalRedirect;
