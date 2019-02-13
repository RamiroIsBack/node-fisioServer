import React, { Component } from "react";
import axios from "axios";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";

import FormTecnica from "../presentational/FormTecnica";
import actions from "../../actions";
import FormModalNewTecnica from "../presentational/FormModalNewTecnica";

class TecnicasContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalNewTecnicaShow: false,
      modalNewTecnica: {
        modalName: "Quires mostrar un nuevo Tecnica?",
        actionName: "crear el Tecnica"
      },
      modalEliminarTecnicaShow: false,
      modalEliminarTecnica: {
        modalName: "Quires eliminar esta Tecnica?",
        actionName: "eliminar Tecnica",
        modalBodie:
          "Si lo eliminas se pierden los datos, si quieres copiar algun texto o algo, hazlo antes de eliminar el Tecnica"
      }
    };
  }
  componentDidMount() {
    // getting tecnicasCopy at inicioContainer cos I use them also for Equipo
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
      if (dude && this.props.copy.tecnicasCopy) {
        let id = this.props.copy.tecnicasCopy._id;
        let tecnicas = this.props.copy.tecnicasCopy.tecnicas;

        if (dataObject.partID === "tecnica") {
          // tecnica field
          if (dataObject.chunkID === "newTecnica") {
            tecnicas.push(dataObject.newTecnica);
          } else if (dataObject.chunkID === "eliminar") {
            tecnicas = tecnicas.filter(
              (tecnica, index) => dataObject.tecnicaIndex !== index
            );
          } else {
            tecnicas[dataObject.tecnicaIndex][dataObject.chunkID] =
              dataObject.chunkData;
          }
        } else {
          console.log("partID no corresponde con tecnica", dataObject.partID);
          return;
        }
        axios({
          method: "patch",
          url: "/copy/tecnicas",
          data: { id, tecnicas },
          headers: { "x-auth": dude.token }
        })
          .then(res => {
            console.log(res);
            this.props.tecnicasReceived(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  createNewTecnica(newTecnica) {
    this.subirChunk({
      newTecnica,
      partID: "tecnica",
      chunkID: "newTecnica"
    });
    this.toggleModalNewTecnica();
  }
  toggleModalNewTecnica() {
    this.setState({ modalNewTecnicaShow: !this.state.modalNewTecnicaShow });
  }
  render(props) {
    return (
      <div>
        <div>
          <Container style={{ marginTop: 20, marginBottom: 15 }}>
            <p>
              dentro de cada Tecnica puedes editar sus tarifas y las t'ecnicas
              que pertenecen a ese Tecnica
            </p>
            <p>
              cada Tecnica o t'ecnica que agreges aqui ser'a una opcion a la
              hora de crear personas en la tab 'equipo' del menu de arriba (no
              es mucho lio ya ver'as q es bastante intuitivo ;)
            </p>
          </Container>
          <h3 style={{ display: "inline" }}>Tecnicas prestados </h3>
          <p style={{ display: "inline" }}>tambien puedes anadir </p>

          <FormModalNewTecnica
            modalShow={this.state.modalNewTecnicaShow}
            modal={this.state.modalNewTecnica}
            pics={this.props.copy.pics}
            servicios={this.props.copy.serviciosCopy.servicios}
            toggleModal={this.toggleModalNewTecnica.bind(this)}
            createNewTecnica={this.createNewTecnica.bind(this)}
            subirFoto={this.subirFoto.bind(this)}
          />

          <Button
            id="newTecnica"
            name="newTecnica"
            onClick={() => this.setState({ modalNewTecnicaShow: true })}
            color="success"
            style={{ display: "inline" }}
          >
            + Tecnica
          </Button>
        </div>
        <br />
        {this.props.copy.tecnicasCopy ? (
          this.props.copy.tecnicasCopy.tecnicas.map((tecnica, index) => {
            return (
              <FormTecnica
                key={tecnica.nombre}
                tecnicaIndex={index}
                tecnica={tecnica}
                servicios={this.props.copy.serviciosCopy.servicios}
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
)(TecnicasContainer);
