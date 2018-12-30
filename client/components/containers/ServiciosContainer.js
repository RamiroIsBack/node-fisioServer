import React, { Component } from "react";
import ServiciosForm from "../presentational/ServiciosForm";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../actions";

class ServiciosContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render(props) {
    return (
      <div className="container">
        <h3>Servicios</h3>
        <ServiciosForm />
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    instalacionesReceived: instalacionesCopy =>
      dispatch(actions.instalacionesReceived(instalacionesCopy)),
    subirFoto: (id, archivo) => dispatch(actions.subirFoto(id, archivo))
  };
};

const stateToProps = state => {
  return {
    user: state.user,
    copy: state.copy
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(ServiciosContainer);
