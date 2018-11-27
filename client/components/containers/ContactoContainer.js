import React, { Component } from "react";
import ContactoForm from "../presentational/ContactoForm";

class ContactoContainer extends Component {
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
        <h3>Contacto</h3>
        <ContactoForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default ContactoContainer;
