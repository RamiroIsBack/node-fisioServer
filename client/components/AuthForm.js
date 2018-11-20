import React, { Component } from "react";

class AuthForm extends Component {
  constructor() {
    super();
    this.state = { nombre: "", password: "" };
  }
  onSubmit(e) {
    e.preventDefault();
    const { nombre, password } = this.state;
    this.props.onSubmit({ nombre, password });
  }
  render() {
    return (
      <div>
        <form className="col s6" onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input
              placeholder="nombre"
              value={this.state.nombre}
              onChange={e => this.setState({ nombre: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
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

export default AuthForm;
