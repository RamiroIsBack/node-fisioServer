import React, { Component } from "react";
import LoginForm from "../presentational/LoginForm";
import axios from "axios";
import { connect } from "react-redux";

import history from "../../utils/history";
import actions from "../../actions";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  onSubmit({ nombre, password }) {
    axios
      .post("/users/login", {
        headers: { "x-auth": "hommmmme" },
        params: {
          nombre,
          password
        }
      })
      .then(res => {
        let token = res.headers["x-auth"];
        var { nombre, _id, firebaseUser, firebaseConfig } = res.data;
        this.props.theDude({
          nombre,
          _id,
          firebaseUser,
          firebaseConfig,
          token
        });
        history.push("/inicio");
        this.props.loginFirebase({ firebaseUser, firebaseConfig });
      })
      .catch(err => {
        this.setState({ errors: ["nombre o password incorrectos"] });
        console.log(err);
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
const dispatchToProps = dispatch => {
  return {
    theDude: theMan => dispatch(actions.theDude(theMan)),
    loginFirebase: firebaseObject =>
      dispatch(actions.loginFirebase(firebaseObject))
  };
};

const stateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(LoginContainer);
