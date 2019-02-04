import React, { Component } from "react";
import axios from "axios";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";

import FormServicio from "../presentational/FormServicio";
import actions from "../../actions";
import FormModalNewServicio from "../presentational/FormModalNewServicio";

class ServiciosContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalNewServicioShow: false,
      modalNewServicio: {
        modalName: "Quires mostrar un nuevo servicio?",
        actionName: "crear el servicio"
      },
      modalEliminarServicioShow: false,
      modalEliminarServicio: {
        modalName: "Quires eliminar este servicio?",
        actionName: "eliminar servicio",
        modalBodie:
          "Si lo eliminas se pierden los datos, si quieres copiar algun texto o algo, hazlo antes de eliminar el servicio"
      }
    };
  }
  componentDidMount() {
    // getting serviciosCopy at inicioContainer cos I use them also for Tecnicas
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
        let servicios = this.props.copy.serviciosCopy.servicios;

        if (dataObject.partID === "servicio") {
          // servicio field
          if (dataObject.chunkID === "newServicio") {
            servicios.push(dataObject.newServicio);
          } else if (dataObject.chunkID === "eliminar") {
            servicios = servicios.filter(
              (servicio, index) => dataObject.servicioIndex !== index
            );
          } else {
            servicios[dataObject.servicioIndex][dataObject.chunkID] =
              dataObject.chunkData;
          }
        } else {
          console.log(
            "partID no corresponde con servicio o tecnica",
            dataObject.partID
          );
          return;
        }
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
      }
    }
  }

  createNewServicio(newServicio) {
    this.subirChunk({
      newServicio,
      partID: "servicio",
      chunkID: "newServicio"
    });
    this.toggleModalNewServicio();
  }
  toggleModalNewServicio() {
    this.setState({ modalNewServicioShow: !this.state.modalNewServicioShow });
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

          <FormModalNewServicio
            modalShow={this.state.modalNewServicioShow}
            modal={this.state.modalNewServicio}
            pics={this.props.copy.pics}
            toggleModal={this.toggleModalNewServicio.bind(this)}
            createNewServicio={this.createNewServicio.bind(this)}
            subirFoto={this.subirFoto.bind(this)}
          />

          <Button
            id="newServicio"
            name="newServicio"
            onClick={() => this.setState({ modalNewServicioShow: true })}
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
