import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import actions from "../../actions";
import EquipoForm from "../presentational/EquipoForm";
import FormPersonas from "../presentational/FormPersonas";
import FormModalNewPersona from "../presentational/FormModalNewPersona";

class EquipoContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalNewPersonaShow: false,
      modalNewPersona: {
        modalName: "Quires mostrar un nuevo Persona?",
        actionName: "crear el Persona"
      },
      modalEliminarPersonaShow: false,
      modalEliminarPersona: {
        modalName: "Quires eliminar esta Persona?",
        actionName: "eliminar Persona",
        modalBodie:
          "Si lo eliminas se pierden los datos, si quieres copiar algun texto o algo, hazlo antes de eliminar el Persona"
      }
    };
    this.subirChunk = this.subirChunk.bind(this);
    this.subirFoto = this.subirFoto.bind(this);
    this.newPersona = this.newPersona.bind(this);
    this.toggleModalNewPersona = this.toggleModalNewPersona.bind(this);
    this.createNewPersona = this.createNewPersona.bind(this);
  }
  componentDidMount() {
    axios({
      method: "get",
      url: "/copy/equipo"
    })
      .then(res => {
        this.props.equipoReceived(res.data.equipoCopy[0]);
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
      if (dude && this.props.copy.equipoCopy) {
        const id = this.props.copy.equipoCopy._id;
        if (dataObject.chunkID === "equipoTextoLargo") {
          let partID = dataObject.partID;
          axios({
            method: "patch",
            url: "/copy/equipo",
            data: { id, partID, [dataObject.chunkID]: dataObject.chunkData },
            headers: { "x-auth": dude.token }
          })
            .then(res => {
              console.log(res);
              this.props.equipoReceived(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          //we are inside personas []
          let equipo = [...this.props.copy.equipoCopy.equipo];

          if (dataObject.partID === "persona") {
            if (dataObject.chunkID === "newPersona") {
              equipo.push(dataObject.newPersona);
            } else if (dataObject.chunkID === "eliminar") {
              equipo.splice(dataObject.personaIndex, 1);
            } else if (dataObject.partID === "formacion") {
              equipo[dataObject.personaIndex].formacion[
                dataObject.formacionIndex
              ][dataObject.chunkID] = dataObject.chunkData;
            } else if (dataObject.partID === "tecnica") {
              console.log("hola tecnica");
            } else {
              equipo[dataObject.personaIndex] = dataObject.updatedPersona;
            }

            axios({
              method: "patch",
              url: "/copy/equipo",
              data: { id, equipo },
              headers: { "x-auth": dude.token }
            })
              .then(res => {
                console.log(res);
                this.props.equipoReceived(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("partID no corresponde con persona", dataObject.partID);
          }
        }
      }
    }
  }
  newPersona(newPersona) {
    this.subirChunk({
      newPersona,
      partID: "persona",
      chunkID: "newPersona"
    });
    this.toggleModalNewPersona();
  }
  toggleModalNewPersona() {
    this.setState({ modalNewPersonaShow: !this.state.modalNewPersonaShow });
  }
  createNewPersona(newPersona) {
    this.subirChunk({
      newPersona,
      partID: "persona",
      chunkID: "newPersona"
    });
    this.toggleModalNewPersona();
  }
  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Equipo</h3>
        <EquipoForm
          copy={this.props.copy.equipoCopy}
          subirChunk={this.subirChunk}
        />
        <div>
          <h3 style={{ display: "inline" }}>Personas del equipo </h3>
          <p style={{ display: "inline" }}>tambien puedes anadir alguien</p>
          <FormModalNewPersona
            modalShow={this.state.modalNewPersonaShow}
            modal={this.state.modalNewPersona}
            pics={this.props.copy.pics}
            servicios={this.props.copy.serviciosCopy.servicios}
            toggleModal={this.toggleModalNewPersona}
            createNewPersona={this.createNewPersona}
            subirFoto={this.subirFoto}
          />
          <Button
            id="newPerson"
            onClick={() => this.setState({ modalNewPersonaShow: true })}
            color="success"
            style={{ display: "inline" }}
          >
            + Nuev@
          </Button>
        </div>
        <br />
        {this.props.copy.equipoCopy ? (
          this.props.copy.equipoCopy.equipo.map((persona, index) => {
            return (
              <FormPersonas
                key={persona.apellido}
                personaIndex={index}
                persona={persona}
                tecnicas={this.props.copy.tecnicasCopy.tecnicas}
                pics={this.props.copy.pics}
                modifyPerson={this.modifyPerson}
                subirChunk={this.subirChunk}
                subirFoto={this.subirFoto}
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
    equipoReceived: equipoCopy => dispatch(actions.equipoReceived(equipoCopy)),
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
)(EquipoContainer);
