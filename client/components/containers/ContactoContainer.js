import React, { Component } from "react";
import { graphql } from "react-apollo";
import ContactoForm from "../presentational/ContactoForm";
import loginMutation from "../../mutations/Login";
import currentUserQuery from "../../queries/CurrentUser";

class ContactoContainer extends Component {
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
        <h3>Contacto</h3>
        <ContactoForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(currentUserQuery)(
  graphql(loginMutation)(ContactoContainer)
);
