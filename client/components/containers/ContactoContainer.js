import React, { Component } from "react";
import axios from "axios";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";

import FormContacto from "../presentational/FormContacto";
import actions from "../../actions";

class ContactoContainer extends Component {
  componentDidMount() {
    axios({
      method: "get",
      url: "/copy/contacto"
    })
      .then(res => {
        this.props.contactoReceived(res.data.contactoCopy[0]);
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
  subirChunk(dataObject) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude && this.props.copy.contactoCopy) {
        let id = this.props.copy.contactoCopy._id;
        let contacto = this.props.copy.contactoCopy;
        if (dataObject.partID === "contacto") {
          contacto[dataObject.chunkID] = dataObject.chunkData;
          axios({
            method: "patch",
            url: "/copy/contacto",
            data: { id, contacto },
            headers: { "x-auth": dude.token }
          })
            .then(res => {
              console.log(res);
              this.props.contactoReceived(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log(
            "partID no corresponde con servicio o tecnica",
            dataObject.partID
          );
        }
      }
    }
  }
  newServicio(e) {
    console.log("you just hired a new guy!");
  }
  render(props) {
    return (
      <div>
        <div>
          <Container style={{ marginTop: 20, marginBottom: 15 }}>
            <p>
              aqui puedes editar la forma de contacto , el como llegar y as'i
            </p>
          </Container>
          <h3 style={{ display: "inline" }}>Contacto</h3>
        </div>
        <br />
        {this.props.copy.contactoCopy && (
          <FormContacto
            contacto={this.props.copy.contactoCopy}
            subirChunk={this.subirChunk.bind(this)}
          />
        )}
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    contactoReceived: contactoCopy =>
      dispatch(actions.contactoReceived(contactoCopy)),
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
)(ContactoContainer);
