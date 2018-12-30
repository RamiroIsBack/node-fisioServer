import React, { Component } from "react";

class ServiciosForm extends Component {
  constructor() {
    super();
    this.state = {
      parameters: { serviciosTextoCorto: "", serviciosTextoLargo: "" }
    };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.name] = e.target.value;
    this.setState(obj);
  }
  handleOnSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.parameters);
  }
  render() {
    return <div>servicios here baby</div>;
  }
}

export default ServiciosForm;
