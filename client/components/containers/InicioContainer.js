import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import actions from "../../actions";
import InicioForm from "../presentational/InicioForm";
import InicioFormPictures from "../presentational/InicioFormPictures";

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
  subirFoto(id, archivo) {
    if (archivo) {
      this.props.subirFoto(id, archivo);
    } else {
      console.log("no hay archivo q subir" + archivo);
    }
  }
  subirChunk(num, chunkID, chunkData) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude && this.props.copy.inicioCopy) {
        let id = this.props.copy.inicioCopy._id;
        if (num === 100) {
          //text
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
        } else {
          // just to create them
          //let items = [{ src: "" }, { src: "" }, { src: "" }, { src: "" }];
          let items = this.props.copy.inicioCopy.items;
          items[num].src = chunkData;
          axios({
            method: "patch",
            url: "/copy/inicio",
            data: { id, items },
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
  }
  render(props) {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Home</h3>
        <InicioForm
          copy={this.props.copy.inicioCopy}
          subirChunk={this.subirChunk.bind(this)}
        />
        <div>
          <h3 style={{ display: "inline" }}>Carousell de fotos </h3>
          <p style={{ display: "inline" }}>
            que luego son tambien fotos de los diferentes servicios
          </p>
        </div>
        <br />

        <InicioFormPictures
          copy={this.props.copy.inicioCopy}
          pics={this.props.copy.pics}
          number="0"
          id="picFisio"
          servicio="Fisioterapia"
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        />
        <InicioFormPictures
          copy={this.props.copy.inicioCopy}
          pics={this.props.copy.pics}
          number="1"
          id="picOsteo"
          servicio="Osteopatia"
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        />
        <InicioFormPictures
          copy={this.props.copy.inicioCopy}
          pics={this.props.copy.pics}
          number="2"
          id="picPodo"
          servicio="Podologia"
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        />
        <InicioFormPictures
          copy={this.props.copy.inicioCopy}
          pics={this.props.copy.pics}
          number="3"
          id="picPilates"
          servicio="Pilates"
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        />
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    inicioReceived: inicioCopy => dispatch(actions.inicioReceived(inicioCopy)),
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
)(InicioContainer);
