import React, { Component } from "react";
import axios from "axios";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";

import FormServicio from "../presentational/FormServicio";
import actions from "../../actions";
import FormModal from "../presentational/formModal";

class ServiciosContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
      modal: {
        modalName: "Quires mostrar un nuevo servicio?",
        actionName: "",
        modalBodie: ""
      }
    };
  }
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
        let servicios = this.props.copy.serviciosCopy.servicios;

        if (dataObject.partID === "newServicio") {
          servicios = this.newServicio(servicios);
        } else if (dataObject.partID === "tecnica") {
          servicios[dataObject.servicioIndex].tecnicas[dataObject.tecnicaIndex][
            dataObject.chunkID
          ] = dataObject.chunkData;
        } else if (dataObject.partID === "servicio") {
          // servicio field
          servicios[dataObject.servicioIndex][dataObject.chunkID] =
            dataObject.chunkData;
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

  newServicio(servicios) {
    servicios.push({
      nombre: "*******************",
      precio: 0,
      duracion: 0,
      bono: {
        modalidad: "Bono",
        numero: 0,
        precio: 0
      },
      urlPic: "*******************",

      servicioTextoLargo: `*******************`,

      tecnicas: [
        {
          nombre: "******************",
          servicio: "*******************",
          texto: `*******************`
        }
      ]
    });
    return servicios;
  }
  doSomething() {
    this.subirChunk({ partID: "newServicio" });
    this.toggleModal();
  }
  toggleModal() {
    this.setState({ modalShow: !this.state.modalShow });
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

          <FormModal
            modalShow={this.state.modalShow}
            modal={this.state.modal}
            toggleModal={this.toggleModal.bind(this)}
            doSomething={this.doSomething.bind(this)}
          />

          <Button
            id="newServicio"
            name="newServicio"
            onClick={() => this.setState({ modalShow: true })}
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
