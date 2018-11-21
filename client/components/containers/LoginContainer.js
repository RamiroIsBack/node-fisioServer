import React, { Component } from "react";
import { graphql } from "react-apollo";
import LoginForm from "../presentational/LoginForm";
import loginMutation from "../../mutations/Login";
import currentUserQuery from "../../queries/CurrentUser";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  onSubmit({ nombre, password }) {
    this.props
      .mutate({
        variables: { nombre, password },
        refetchQueries: () => [{ query: currentUserQuery }]
      })
      .catch(err => {
        const errors = err.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
  }
  render(props) {
    return (
      <div className="container">
        <h3>Login</h3>
        <LoginForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(currentUserQuery)(
  graphql(loginMutation)(LoginContainer)
);
