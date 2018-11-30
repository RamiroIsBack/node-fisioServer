import React, { Component } from "react";
import InicioForm from "../presentational/InicioForm";

class InicioContainer extends Component {
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
        <h3 style={{ textAlign: "center" }}>Home</h3>
        <InicioForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default InicioContainer;
