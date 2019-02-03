import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import history from "../../utils/history";

class NavFisioConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "inicio",
      activeInicio: "active",
      activeContacto: "",
      aciveEquipo: "",
      activeInstalaciones: "",
      activeServicios: "",
      activeTecnicas: ""
    };
  }
  handleOnClick(e) {
    if (e.target.id === "inicio") {
      this.setState({
        activeTab: e.target.id,
        activeInicio: "active",
        aciveEquipo: "",
        activeInstalaciones: "",
        activeServicios: "",
        activeTecnicas: "",
        activeContacto: ""
      });
      history.push("/inicio");
    } else if (e.target.id === "equipo") {
      this.setState({
        activeTab: e.target.id,
        activeInicio: "",
        aciveEquipo: "active",
        activeInstalaciones: "",
        activeServicios: "",
        activeTecnicas: "",
        activeContacto: ""
      });
      history.push("/equipo");
    } else if (e.target.id === "instalaciones") {
      this.setState({
        activeTab: e.target.id,
        activeInicio: "",
        aciveEquipo: "",
        activeInstalaciones: "active",
        activeServicios: "",
        activeTecnicas: "",
        activeContacto: ""
      });
      history.push("/instalaciones");
    } else if (e.target.id === "tecnicas") {
      this.setState({
        activeTab: e.target.id,
        activeInicio: "",
        aciveEquipo: "",
        activeInstalaciones: "",
        activeServicios: "",
        activeTecnicas: "active",
        activeContacto: ""
      });
      history.push("/tecnicas");
    } else if (e.target.id === "contacto") {
      this.setState({
        activeTab: e.target.id,
        activeInicio: "",
        aciveEquipo: "",
        activeInstalaciones: "",
        activeServicios: "",
        activeTecnicas: "",
        activeContacto: "active"
      });
      history.push("/contacto");
    } else if (e.target.id === "servicios") {
      this.setState({
        activeTab: e.target.id,
        activeInicio: "",
        aciveEquipo: "",
        activeInstalaciones: "",
        activeServicios: "active",
        activeTecnicas: "",
        activeContacto: ""
      });
      history.push("/servicios");
    }
  }
  render() {
    return (
      <Nav tabs className=" w-100 justify-content-around">
        <NavItem>
          <NavLink
            style={{ paddingLeft: "6px", cursor: "pointer" }}
            id="inicio"
            className={this.state.activeInicio}
            onClick={this.handleOnClick.bind(this)}
          >
            INICIO
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ paddingLeft: "6px", cursor: "pointer" }}
            id="equipo"
            className={this.state.aciveEquipo}
            onClick={this.handleOnClick.bind(this)}
          >
            EQUIPO
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ paddingLeft: "6px", cursor: "pointer" }}
            id="instalaciones"
            className={this.state.activeInstalaciones}
            onClick={this.handleOnClick.bind(this)}
          >
            INSTALACIONES
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ paddingLeft: "6px", cursor: "pointer" }}
            id="servicios"
            className={this.state.activeServicios}
            onClick={this.handleOnClick.bind(this)}
          >
            SERVICIOS (y tarifas)
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            style={{ paddingLeft: "6px", cursor: "pointer" }}
            id="tecnicas"
            className={this.state.activeTecnicas}
            onClick={this.handleOnClick.bind(this)}
          >
            TECNICAS
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            style={{ paddingLeft: "6px", cursor: "pointer" }}
            id="contacto"
            className={this.state.activeContacto}
            onClick={this.handleOnClick.bind(this)}
          >
            CONTACTO
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}
export default NavFisioConfig;
