import React, { Component } from "react";
import axios from "axios";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";

import FormServicio from "../presentational/FormServicio";
import actions from "../../actions";

class ServiciosContainer extends Component {
  componentDidMount() {
    axios({
      method: "get",
      url: "/copy/servicios"
    })
      .then(res => {
        this.props.serviciosReceived(res.data.serviciosCopy[0]);
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
      if (dude && this.props.copy.serviciosCopy) {
        let id = this.props.copy.serviciosCopy._id;
        if (dataObject.chunkID === "serviciosTextoLargo") {
          axios({
            method: "patch",
            url: "/copy/servicios",
            data: { id, partID, [dataObject.chunkID]: dataObject.chunkData },
            headers: { "x-auth": dude.token }
          })
            .then(res => {
              console.log(res);
              this.props.serviciosReceived(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          //we are inside each servicio []
          let servicios = this.props.copy.serviciosCopy.servicios;
          if (dataObject.partID === "tecnica") {
            servicios[dataObject.personaIndex].tecnicas[
              dataObject.tecnicaIndex
            ][dataObject.chunkID] = dataObject.chunkData;
            axios({
              method: "patch",
              url: "/copy/servicios",
              data: { id, servicios },
              headers: { "x-auth": dude.token }
            })
              .then(res => {
                console.log(res);
                this.props.serviciosReceived(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (dataObject.partID === "formacion") {
            servicios[dataObject.personaIndex].formacion[
              dataObject.formacionIndex
            ][dataObject.chunkID] = dataObject.chunkData;
            axios({
              method: "patch",
              url: "/copy/servicios",
              data: { id, servicios },
              headers: { "x-auth": dude.token }
            })
              .then(res => {
                console.log(res);
                this.props.serviciosReceived(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (dataObject.partID === "persona") {
            // persona field
            servicios[dataObject.personaIndex][dataObject.chunkID] =
              dataObject.chunkData;
            axios({
              method: "patch",
              url: "/copy/servicios",
              data: { id, servicios },
              headers: { "x-auth": dude.token }
            })
              .then(res => {
                console.log(res);
                this.props.serviciosReceived(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log(
              "partID no corresponde con persona, formacion o tecnica",
              partID
            );
          }
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
              dentro de cada servicio puedes editar sus tarifas y las t'ecnicas
              que pertenecen a ese servicio
            </p>
            <p>
              cada servicio o t'ecnica que agreges aqui ser'a una opcion a la
              hora de crear personas en la tab 'equipo' del menu de arriba (no
              es mucho lio ya ver'as q es bastante intuitivo ;)
            </p>
          </Container>
          <h3 style={{ display: "inline" }}>Servicios prestados </h3>
          <p style={{ display: "inline" }}>tambien puedes anadir </p>
          <Button
            id="newServicio"
            onClick={this.newServicio.bind(this)}
            color="success"
            style={{ display: "inline" }}
          >
            + Servicio
          </Button>
        </div>
        <br />
        {this.props.copy.serviciosCopy ? (
          this.props.copy.serviciosCopy.servicios.map((servicio, index) => {
            return (
              <FormServicio
                key={servicio._id}
                servicioIndex={index}
                servicio={servicio}
                pics={this.props.copy.pics}
                subirChunk={this.subirChunk.bind(this)}
                subirFoto={this.subirFoto.bind(this)}
              />
            );
          })
        ) : (
          <div />
        )}
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    serviciosReceived: serviciosCopy =>
      dispatch(actions.serviciosReceived(serviciosCopy)),
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
