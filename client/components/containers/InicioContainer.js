import React, { Component } from "react";
import InicioForm from "../presentational/InicioForm";
import axios from "axios";
import { connect } from "react-redux";

class InicioContainer extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  subirTextoCorto(inicioTextoCorto) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude) {
        axios
          .patch("/copy/inicio", {
            headers: { "x-auth": dude.token },
            params: {
              inicioTextoCorto
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
  subirTextoLargo(parameters) {
    console.log(parameters);
  }
  render(props) {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Home</h3>
        <InicioForm
          subirTextoLargo={this.subirTextoLargo.bind(this)}
          errors={this.state.errors}
          subirTextoCorto={this.subirTextoCorto.bind(this)}
        />
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    theDude: theMan => dispatch(actions.theDude(theMan))
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
)(InicioContainer);
