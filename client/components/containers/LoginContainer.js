import React, { Component } from "react";
import LoginForm from "../presentational/LoginForm";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  onSubmit({ nombre, password }) {
    console.log("hola");
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

export default LoginContainer;
