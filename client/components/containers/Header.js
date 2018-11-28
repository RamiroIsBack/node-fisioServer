import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";

import actions from "../../actions";
import NavFisioConfig from "./NavFisioConfig";
import axios from "axios";

class Header extends Component {
  componentDidMount() {
    if (!this.props.user.logedIn) {
      axios
        .get("/users/login", {
          headers: { auth: "hommmmme" }
        })
        .then(res => {
          this.props.isTheDude(res.data);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  renderButtons() {
    let loading = null;
    if (loading) {
      return <div />;
    }
    if (this.props.user.logedIn) {
      //render here all the liks to modify everything
      return <NavFisioConfig />;
    }
  }
  render() {
    return (
      <div>
        <Jumbotron style={{ textAlign: "center", padding: 10 }}>
          <h1>Hola Javi!</h1>
        </Jumbotron>
        {!this.props.user.logedIn && (
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
