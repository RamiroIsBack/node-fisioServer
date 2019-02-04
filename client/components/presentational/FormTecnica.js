import React, { Component } from "react";
import { Label, Button, FormGroup, Row, Col, Input } from "reactstrap";

import FormModalEliminar from "./FormModalEliminar";
import FormPictures from "./FormPictures";

class FormTecnica extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        servicio: "",
        texto: "",
        urlPic: ""
      },
      modalEliminarTecnicaShow: false,
      modalEliminarTecnica: {
        modalName: "Quires eliminar esta Tecnica?",
        actionName: "eliminar Tecnica",
        modalBodie: `Si lo eliminas se pierden los datos, si quieres copiar algun texto o algo, hazlo antes de eliminar la tecnica. `
      }
    };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }

  subirChunk(e) {
    if (e.chunkID) {
      //this is not the event object
      let dataObject = Object.assign({}, e);
      dataObject.chunkID = "urlPic";
      dataObject.tecnicaIndex = this.props.tecnicaIndex;
      this.props.subirChunk(dataObject);
    } else {
      this.props.subirChunk({
        tecnicaIndex: this.props.tecnicaIndex,
        partID: e.target.name,
        chunkID: e.target.id,
        chunkData: this.state.parameters[e.target.id]
      });
    }
  }
  subirFoto(id, archivo) {
    if (archivo) {
      this.props.subirFoto(id, archivo);
    } else {
      console.log("no hay archivo q subir" + archivo);
    }
  }

  eliminarTecnica() {
    this.props.eliminarTecnica(this.props.tecnicaIndex);
    this.toggleModalEliminarTecnica();
  }
  toggleModalEliminarTecnica() {
    this.setState({
      modalEliminarTecnicaShow: !this.state.modalEliminarTecnicaShow
    });
  }
  render() {
    return (
      <div style={{ padding: 15 }}>
        <FormModalEliminar
          modalShow={this.state.modalEliminarTecnicaShow}
          modal={this.state.modalEliminarTecnica}
          eliminar={this.eliminarTecnica.bind(this)}
          toggleModal={this.toggleModalEliminarTecnica.bind(this)}
        />
        <FormGroup
          style={{
            padding: "2px",
            borderRadius: "4px",
            border: "1px solid black"
          }}
        >
          <Row style={{ marginBottom: 15 }}>
            <Col sm="4">
              <Label>cambiar los datos de {this.props.tecnica.nombre}</Label>
            </Col>
            <Col sm="8" style={{ textAlign: "right" }}>
              <Button
                id="eliminar"
                name="tecnica"
                onClick={() =>
                  this.setState({ modalEliminarTecnicaShow: true })
                }
                color="danger"
              >
                Eliminar tecnica: {this.props.tecnica.nombre}
              </Button>
            </Col>
          </Row>
          {/* //////////////////////////////////////////////////////////nombre////////////////////////////////// */}
          <Row>
            <Col sm="4">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.tecnica.nombre}{" "}
              </h5>
            </Col>
            <Col sm="4">
              <Input
                id="nombre"
                value={this.state.nombre}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`nombre de la tecnica`}
              />
            </Col>
            <Col sm="4">
              <Button
                id="nombre"
                name="tecnica"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar nombre
              </Button>
            </Col>
          </Row>
          {/* ////////////////////////////////////////////// texto ////////////////////////////////// */}
          <Row style={{ width: "95%", paddingTop: 5 }}>
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.tecnica.texto}{" "}
            </h5>
          </Row>
          <Row style={{ width: "95%", paddingTop: 5 }}>
            <Col sm="10">
              <Input
                type="textarea"
                rows="5"
                id="texto"
                value={this.state.texto}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`texto`}
              />
            </Col>
            <Col sm="2">
              <Button
                id="texto"
                name="tecnica"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar texto de la tecnica
              </Button>
            </Col>
          </Row>
          {/* ////////////////////////////////////////////////////////// servicio ////////////////////////////////// */}
          <Row style={{ paddingTop: 5 }}>
            <Col sm="4">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.tecnica.servicio}{" "}
              </h5>
            </Col>
            <Col sm="4">
              <Input
                id="servicio"
                value={this.state.servicio}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`servicio al que pertenece`}
              />
            </Col>
            <Col sm="4">
              <Button
                id="servicio"
                name="tecnica"
                onClick={this.subirChunk.bind(this)}
                color="primary"
                disabled={true}
              >
                Cambiar servicio (esto tiene q ser un dropdown)
              </Button>
            </Col>
          </Row>
          {/* //////////////////////////////////////////////////////////urlPic////////////////////////////////// */}
          <FormPictures
            src={this.props.tecnica.urlPic}
            pics={this.props.pics}
            id={`tecnica${this.props.tecnica.nombre}`}
            name={"tecnica"}
            subirChunk={this.subirChunk.bind(this)}
            subirFoto={this.subirFoto.bind(this)}
          />
        </FormGroup>
      </div>
    );
  }
}

export default FormTecnica;
