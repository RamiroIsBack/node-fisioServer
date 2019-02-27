import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import actions from "../../actions";
import FormInstalaciones from "../presentational/FormInstalaciones";
import FormPictures from "../presentational/FormPictures";

class InstalacionesContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    axios({
      method: "get",
      url: "/copy/instalaciones"
    })
      .then(res => {
        this.props.instalacionesReceived(res.data.instalacionesCopy[0]);
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
  subirChunk({ partID, chunkID, chunkData }) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude && this.props.copy.instalacionesCopy) {
        let id = this.props.copy.instalacionesCopy._id;
        if (partID === "texto") {
          //text
          axios({
            method: "patch",
            url: "/copy/instalaciones",
            data: { id, [chunkID]: chunkData },
            headers: { "x-auth": dude.token }
          })
            .then(res => {
              console.log(res);
              this.props.instalacionesReceived(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (partID === "urlPic") {
          let items = this.props.copy.instalacionesCopy.items;
          let index = "";
          items.map((item, i) => {
            if (item.nombre === chunkID) {
              index = i;
            }
          });
          if (index === "") {
            return console.log(
              "chunkID doesnt match any item.nombre on carouselPics"
            );
          }
          items[index] = {
            nombre: chunkID,
            src: chunkData
          };
          axios({
            method: "patch",
            url: "/copy/instalaciones",
            data: { id, items },
            headers: { "x-auth": dude.token }
          })
            .then(res => {
              console.log(res);
              this.props.instalacionesReceived(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Instalaciones</h3>
        <FormInstalaciones
          copy={this.props.copy.instalacionesCopy}
          subirChunk={this.subirChunk.bind(this)}
        />
        <div>
          <h3 style={{ display: "inline" }}>Carousell de fotos </h3>
          <p style={{ display: "inline" }}>
            que luego son tambien fotos de los diferentes servicios
          </p>
        </div>
        <br />
        {this.props.copy.instalacionesCopy ? (
          this.props.copy.instalacionesCopy.items.map((foto, index) => (
            <FormPictures
              key={index}
              src={foto.src}
              pics={this.props.copy.pics}
              id={foto.nombre}
              name={"urlPic"}
              subirChunk={this.subirChunk.bind(this)}
              subirFoto={this.subirFoto.bind(this)}
            />
          ))
        ) : (
          <div />
        )}
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
)(InstalacionesContainer);
