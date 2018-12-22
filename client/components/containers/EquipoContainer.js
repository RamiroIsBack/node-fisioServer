import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import actions from "../../actions";
import EquipoForm from "../presentational/EquipoForm";
import FormPictures from "../presentational/FormPictures";

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
  subirChunk(num, chunkID, chunkData) {
    if (this.props.user) {
      let dude = this.props.user.dudeObject;
      if (dude && this.props.copy.equipoCopy) {
        let id = this.props.copy.equipoCopy._id;
        if (num === 100) {
          //text
          axios({
            method: "patch",
            url: "/copy/equipo",
            data: { id, [chunkID]: chunkData },
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
          // just to create them
          //let items = [{ src: "" }, { src: "" }, { src: "" }, { src: "" }];
          let items = this.props.copy.equipoCopy.items;
          items[num].src = chunkData;
          axios({
            method: "patch",
            url: "/copy/equipo",
            data: { id, items },
            headers: { "x-auth": dude.token }
          })
            .then(res => {
              console.log(res);
              this.props.equipoReceived(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
  newPerson(e) {
    console.log("you just hired a new guy!");
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

        {/* <FormPictures
          copy={this.props.copy.equipoCopy}
          pics={this.props.copy.pics}
          number="0"
          id="picFisio"
          servicio="Fisioterapia"
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        />
        <FormPictures
          copy={this.props.copy.equipoCopy}
          pics={this.props.copy.pics}
          number="1"
          id="picOsteo"
          servicio="Osteopatia"
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        />
        <FormPictures
          copy={this.props.copy.equipoCopy}
          pics={this.props.copy.pics}
          number="2"
          id="picPodo"
          servicio="Podologia"
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        />
        <FormPictures
          copy={this.props.copy.equipoCopy}
          pics={this.props.copy.pics}
          number="3"
          id="picPilates"
          servicio="Pilates"
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        /> */}
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
