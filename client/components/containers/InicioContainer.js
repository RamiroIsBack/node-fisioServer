import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import actions from "../../actions";
import InicioForm from "../presentational/InicioForm";
import FormPictures from "../presentational/FormPictures";

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
        axios({
          method: "get",
          url: "/copy/servicios"
        }).then(res => {
          this.props.serviciosReceived(res.data.serviciosCopy[0]);
          axios({
            method: "get",
            url: "/copy/tecnicas"
          }).then(res => {
            this.props.tecnicasReceived(res.data.tecnicasCopy[0]);
          });
        });
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
      if (dude && this.props.copy.inicioCopy) {
        let id = this.props.copy.inicioCopy._id;
        if (partID === "texto") {
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
          let items = this.props.copy.inicioCopy.items;
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
  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Home</h3>
        <InicioForm
          copy={this.props.copy.inicioCopy}
          subirChunk={this.subirChunk.bind(this)}
        />
        <div>
          <h3 style={{ display: "inline" }}>Carousell de fotos </h3>
        </div>
        <br />
        {this.props.copy.inicioCopy ? (
          this.props.copy.inicioCopy.items.map((foto, index) => (
            <FormPictures
              key={index}
              src={foto.src}
              pics={this.props.copy.pics}
              id={foto.nombre}
              name={"pic"}
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
    inicioReceived: inicioCopy => dispatch(actions.inicioReceived(inicioCopy)),
    serviciosReceived: serviciosCopy =>
      dispatch(actions.serviciosReceived(serviciosCopy)),
    tecnicasReceived: tecnicasCopy =>
      dispatch(actions.tecnicasReceived(tecnicasCopy)),
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
