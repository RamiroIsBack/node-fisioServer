import React, { Component } from "react";

class InstalacionesForm extends Component {
  constructor() {
    super();
    this.state = {
      parameters: { instalacionesTextoCorto: "", instalacionesTextoLargo: "" }
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
              name="instalacionesTextoCorto"
              placeholder="instalacionesTextoCorto"
              value={this.state.instalacionesTextoCorto}
              onChange={this.handleOnChange.bind(this)}
            />
          </div>
          <div className="input-field">
            <input
              name="instalacionesTextoLargo"
              placeholder="instalacionesTextoLargo"
              value={this.state.instalacionesTextoLargo}
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

export default InstalacionesForm;
