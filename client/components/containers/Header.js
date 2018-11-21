import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import currentUserQuery from "../../queries/CurrentUser";
import logoutMutation from "../../mutations/Logout";
import NavFisioConfig from "./NavFisioConfig";

class Header extends Component {
  constructor() {
    super();
    this.onLogout.bind(this);
  }
  onLogout() {
    this.props
      .mutate({
        refetchQueries: () => [{ query: currentUserQuery }]
      })
      .catch(err => {
        console.log(err);
      });
  }
  renderButtons() {
    const { loading, currentUser } = this.props.data;
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
        {this.props.data.instalacionesCopy && (
          <div>
            <h1> {this.props.data.instalacionesCopy.textoCorto}</h1>
            <h1> {this.props.data.instalacionesCopy.items[0].alt}</h1>
          </div>
        )}
        {this.props.data.loading && (
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

export default graphql(logoutMutation)(graphql(currentUserQuery)(Header));
