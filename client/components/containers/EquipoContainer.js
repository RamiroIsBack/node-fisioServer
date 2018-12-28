import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import actions from "../../actions";
import EquipoForm from "../presentational/EquipoForm";
import FormPersona from "../presentational/FormPersonas";

class EquipoContainer extends Component {
  constructor() {
    super();
    this.state = {};
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
        let id = this.props.copy.equipoCopy._id;
        if (dataObject.chunkID === "equipoTextoLargo") {
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
          let equipo = this.props.copy.equipoCopy.equipo;
          if (dataObject.partID === "tecnica") {
            equipo[dataObject.personaIndex].tecnicas[dataObject.tecnicaIndex][
              dataObject.chunkID
            ] = dataObject.chunkData;
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
          } else if (dataObject.partID === "formacion") {
            equipo[dataObject.personaIndex].formacion[
              dataObject.formacionIndex
            ][dataObject.chunkID] = dataObject.chunkData;
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
          } else if (dataObject.partID === "persona") {
            // persona field
            equipo[dataObject.personaIndex][dataObject.chunkID] =
              dataObject.chunkData;
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
            console.log(
              "partID no corresponde con persona, formacion o tecnica",
              partID
            );
          }
        }
      }
    }
  }
  newPerson(e) {
    console.log("you just hired a new guy!");
  }
  modifyPerson(personModified) {
    console.log("modificando", personModified);
  }
  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Equipo</h3>
        <EquipoForm
          copy={this.props.copy.equipoCopy}
          subirChunk={this.subirChunk.bind(this)}
        />
        <div>
          <h3 style={{ display: "inline" }}>Personas del equipo </h3>
          <p style={{ display: "inline" }}>tambien puedes anadir alguien</p>
          <Button
            id="newPerson"
            onClick={this.newPerson.bind(this)}
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
              <FormPersona
                key={persona.apellido}
                personaIndex={index}
                persona={persona}
                pics={this.props.copy.pics}
                modifyPerson={this.modifyPerson.bind(this)}
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
