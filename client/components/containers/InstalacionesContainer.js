import React, { Component } from "react";
import InstalacionesForm from "../presentational/InstalacionesForm";

class InstalacionesContainer extends Component {
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
        <h3>Instalaciones</h3>
        <InstalacionesForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default InstalacionesContainer;
