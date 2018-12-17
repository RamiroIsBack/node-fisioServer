import React, { Component } from "react";
import InicioForm from "../presentational/InicioForm";
import axios from "axios";
import { connect } from "react-redux";

import actions from "../../actions";

class InicioContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    axios({
      method: "get",
      url: "/copy/inicio"
    })
      .then(res => {
        this.props.inicioReceived(res.data.inicioCopy[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  subirTextoCorto(inicioTextoCorto) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude && this.props.copy.inicioCopy) {
        let id = this.props.copy.inicioCopy._id;

        axios({
          method: "patch",
          url: "/copy/inicio",
          data: { id, inicioTextoCorto },
          headers: { "x-auth": dude.token }
        })
          .then(res => {
            console.log(res);
            this.props.inicioReceived(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
  subirChunk(chunkID, chunkData) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude && this.props.copy.inicioCopy) {
        let id = this.props.copy.inicioCopy._id;

        axios({
          method: "patch",
          url: "/copy/inicio",
          data: { id, [chunkID]: chunkData },
          headers: { "x-auth": dude.token }
        })
          .then(res => {
            console.log(res);
            this.props.inicioReceived(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
  render(props) {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Home</h3>
        <InicioForm
          copy={this.props.copy.inicioCopy}
          subirChunk={this.subirChunk.bind(this)}
        />
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    inicioReceived: inicioCopy => dispatch(actions.inicioReceived(inicioCopy))
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
