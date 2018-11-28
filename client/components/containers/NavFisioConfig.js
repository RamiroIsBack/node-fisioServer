import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import history from "../../utils/history";

class NavFisioConfig extends React.Component {
  handleOnClick(e) {
    if (e.target.id === "inicio") {
      history.push("/inicio");
    } else if (e.target.id === "equipo") {
      history.push("/equipo");
    } else if (e.target.id === "instalaciones") {
      history.push("/instalaciones");
    } else if (e.target.id === "tarifas") {
      history.push("/tarifas");
    } else if (e.target.id === "contacto") {
      history.push("/contacto");
    } else if (e.target.id === "servicios") {
      history.push("/servicios");
    }
  }
  render() {
    return (
      <div>
        <Nav className=" w-100 justify-content-around">
          <NavItem>
            <NavLink
              style={{ paddingLeft: "6px", cursor: "pointer" }}
              id="inicio"
              onClick={this.handleOnClick.bind(this)}
            >
              INICIO
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ paddingLeft: "6px", cursor: "pointer" }}
              id="equipo"
              onClick={this.handleOnClick.bind(this)}
            >
              EQUIPO
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ paddingLeft: "6px", cursor: "pointer" }}
              id="instalaciones"
              onClick={this.handleOnClick.bind(this)}
            >
              INSTALACIONES
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ paddingLeft: "6px", cursor: "pointer" }}
              id="servicios"
              onClick={this.handleOnClick.bind(this)}
            >
              SERVICIOS
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ paddingLeft: "6px", cursor: "pointer" }}
              id="tarifas"
              onClick={this.handleOnClick.bind(this)}
            >
              TARIFAS
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ paddingLeft: "6px", cursor: "pointer" }}
              id="contacto"
              onClick={this.handleOnClick.bind(this)}
            >
              CONTACTO
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
export default NavFisioConfig;
