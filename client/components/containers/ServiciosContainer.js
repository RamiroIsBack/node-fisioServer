import React, { Component } from "react";
import ServiciosForm from "../presentational/ServiciosForm";

class ServiciosContainer extends Component {
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
        <h3>Servicios</h3>
        <ServiciosForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default ServiciosContainer;
