import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";

import NavFisioConfig from "./NavFisioConfig";
import actions from "../../actions";
import axios from "axios";

class Header extends Component {
  componentDidMount() {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude) {
        axios
          .get("/users/me", {
            headers: { "x-auth": dude.token }
          })
          .then(res => {
            this.props.theDude(res.data);
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
  renderButtons() {
    if (this.props.user.dudeObject) {
      //render here all the liks to modify everything
      return <NavFisioConfig />;
    }
  }
  render() {
    return (
      <div>
        <Jumbotron style={{ textAlign: "center", padding: 10 }}>
          <h1 style={{ display: "inline" }}>Hola Javi! </h1>
          <h3 style={{ display: "inline" }}>configura la web:</h3>
        </Jumbotron>
        {!this.props.user.dudeObject && (
          <div style={{ padding: 10 }}>
            <Link style={{ fontSize: 30 }} to="/login">
              Pincha aqui para loguearte lo primero
            </Link>
          </div>
        )}

        <div className="nav-wrapper">{this.renderButtons()}</div>
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    isTheDude: theMan => dispatch(actions.isTheDude(theMan))
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
)(Header);
