import React, { Component } from "react";
import TarifasForm from "../presentational/TarifasForm";

class TarifasContainer extends Component {
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
        <h3>Tarifas</h3>
        <TarifasForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default TarifasContainer;
