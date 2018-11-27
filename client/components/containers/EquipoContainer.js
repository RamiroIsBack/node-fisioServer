import React, { Component } from "react";
import EquipoForm from "../presentational/EquipoForm";

class EquipoContainer extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  onSubmit(parameters) {
    console.log("hola");
  }
  render(props) {
    return (
      <div className="container">
        <h3>Equipo</h3>
        <EquipoForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default EquipoContainer;
