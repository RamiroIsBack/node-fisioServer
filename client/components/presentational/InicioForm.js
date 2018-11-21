import React, { Component } from "react";

class InicioForm extends Component {
  constructor() {
    super();
    this.state = { parameters: { inicioTextoCorto: "", inicioTextoLargo: "" } };
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
              name="inicioTextoCorto"
              placeholder="inicioTextoCorto"
              value={this.state.inicioTextoCorto}
              onChange={this.handleOnChange.bind(this)}
            />
          </div>
          <div className="input-field">
            <input
              name="inicioTextoLargo"
              placeholder="inicioTextoLargo"
              value={this.state.inicioTextoLargo}
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

export default InicioForm;
