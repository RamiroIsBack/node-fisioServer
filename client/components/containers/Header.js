import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavFisioConfig from "./NavFisioConfig";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      logedIn: false
    };
  }
  componentDidUpdate() {
    if (!this.state.logedIn) {
      axios
        .get("https://stormy-meadow-66204.herokuapp.com/users/login")
        .then(res => {
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
    if (this.state.logedIn) {
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
        {!this.state.logedIn && (
          <div>
            <h1> Hola Javi, logueate lo primero</h1>
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

export default Header;
