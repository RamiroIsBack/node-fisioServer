import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavFisioConfig from "./NavFisioConfig";

class Header extends Component {
  renderButtons() {
    let currentUser = true;
    let loading = null;
    if (loading) {
      return <div />;
    }
    if (currentUser) {
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
        {this.props.instalacionesCopy && (
          <div>
            <h1> {this.props.data.instalacionesCopy.textoCorto}</h1>
            <h1> {this.props.data.instalacionesCopy.items[0].alt}</h1>
          </div>
        )}
        {this.props.loading && (
          <div>
            <h1>Cargando...</h1>
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
