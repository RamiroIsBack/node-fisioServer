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

  subirChunk(dataObject) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude && this.props.copy.contactoCopy) {
        let id = this.props.copy.contactoCopy._id;
        let contacto = Object.assign({}, this.props.copy.contactoCopy);
        if (
          dataObject.partID === "direccion" ||
          dataObject.partID === "telCopy" ||
          dataObject.partID === "emailCopy"
        ) {
          contacto[dataObject.partID][dataObject.chunkID] =
            dataObject.chunkData;
          dataObject.chunkID = dataObject.partID;
          dataObject.chunkData = contacto[dataObject.partID];
        }

        axios({
          method: "patch",
          url: "/copy/contacto",
          data: { id, [dataObject.chunkID]: dataObject.chunkData },
          headers: { "x-auth": dude.token }
        })
          .then(res => {
            console.log(res);
            this.props.contactoReceived(res.data);
          })
          .catch(err => {
            console.log(err);
          });
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
