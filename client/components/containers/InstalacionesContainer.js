import React, { Component } from "react";
import { graphql } from "react-apollo";
import InstalacionesForm from "../presentational/InstalacionesForm";
import loginMutation from "../../mutations/Login";
import currentUserQuery from "../../queries/CurrentUser";

class InstalacionesContainer extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  onSubmit(parameters) {
    this.props
      .mutate({
        variables: { parameters }
      })
      .catch(err => {
        const errors = err.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
  }
  render(props) {
    return (
      <div className="container">
        <h3>Instalaciones</h3>
        <InstalacionesForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(currentUserQuery)(
  graphql(loginMutation)(InstalacionesContainer)
);
