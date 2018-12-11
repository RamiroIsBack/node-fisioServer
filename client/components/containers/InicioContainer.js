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

  subirTextoCorto({ inicioTextoCorto, inicioTextoLargo }) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude) {
        axios
          .post("/coy/inicio", {
            headers: { "x-auth": dude.token },
            params: {
              inicioTextoCorto,
              inicioTextoLargo
            }
          })
          .then(res => {
            let token = res.headers["x-auth"];
            let { nombre, _id } = res.data;
            this.props.theDude({ nombre, _id, token });
            history.push("/inicio");
          })
          .catch(err => {
            this.setState({ errors: ["nombre o password incorrectos"] });
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
