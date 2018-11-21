import React from "react";
import { Link } from "react-router-dom";

class NavFisioConfig extends React.Component {
  render() {
    return (
      <div>
        <Link to="/inicio">inicio</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/instalaciones">instalaciones</Link>
        <Link to="/equipo">equipo</Link>
        <Link to="/servicios">servicios</Link>
        <Link to="/tarifas">tarifas</Link>
      </div>
    );
  }
}
export default NavFisioConfig;
