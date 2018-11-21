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
    return (
      <div>
        <form className="col s6" onSubmit={this.handleOnSubmit.bind(this)}>
          <div className="input-field">
            <input
              name="serviciosTextoCorto"
              placeholder="serviciosTextoCorto"
              value={this.state.serviciosTextoCorto}
              onChange={this.handleOnChange.bind(this)}
            />
          </div>
          <div className="input-field">
            <input
              name="serviciosTextoLargo"
              placeholder="serviciosTextoLargo"
              value={this.state.serviciosTextoLargo}
              onChange={this.handleOnChange.bind(this)}
            />
          </div>

          <div className="errors">
            {this.props.errors.map(error => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <button className="btn">submit</button>
        </form>
      </div>
    );
  }
}

export default ServiciosForm;
