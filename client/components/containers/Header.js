import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import actions from "../../actions";
import NavFisioConfig from "./NavFisioConfig";
import axios from "axios";

class Header extends Component {
  componentDidMount() {
    if (!this.props.user.logedIn) {
      axios
        .get("https://stormy-meadow-66204.herokuapp.com/users/login")
        .then(res => {
          this.props.isTheDude(res.data.saludo);
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
    } else {
      return (
        <div>
          <Link to="/login">Log in</Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Hola Javi!</h1>
        </div>
        {!this.props.user.logedIn && (
          <div>
            <h2>logueate lo primero</h2>
          </div>
        )}

        <div className="nav-wrapper">
          <nav>
            <div>{this.renderButtons()}</div>
          </nav>
        </div>
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
