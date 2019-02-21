import React, { Component } from "react";
import { Button, FormGroup, Row, Col, Input, Label } from "reactstrap";

import FormPictures from "./FormPictures";
import FormModalEliminar from "./FormModalEliminar";

class FormFormacion extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        estudios: "",
        centroFormativo: "",
        centroUrlPic: "",
        centroUrl: "",
        fecha: ""
      },
      modalNewFormacionShow: false,
      modalNewFormacion: {
        modalName: "Quires mostrar un nuevo Formacion?",
        actionName: "crear el Formacion"
      },
      modalEliminarFormacionShow: false,
      modalEliminarFormacion: {
        modalName: "Quires eliminar esta Formacion?",
        actionName: "eliminar Formacion",
        modalBodie:
          "Si lo eliminas se pierden los datos, si quieres copiar algun texto o algo, hazlo antes de eliminar el Formacion"
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
      dataObject.chunkID = "centroUrlPic";
      dataObject.formacionIndex = this.props.formacionIndex;
      this.props.subirChunk(dataObject);
    } else {
      this.props.subirChunk({
        formacionIndex: this.props.formacionIndex,
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
  eliminarFormacion() {
    let dataObject = {};
    dataObject.chunkID = "eliminar";
    dataObject.partID = "formacion";
    dataObject.formacionIndex = this.props.formacionIndex;
    this.props.subirChunk(dataObject);
    this.toggleModalEliminarFormacion();
  }
  toggleModalEliminarFormacion() {
    this.setState({
      modalEliminarFormacionShow: !this.state.modalEliminarFormacionShow
    });
  }

  render() {
    return (
      <FormGroup
        style={{
          padding: "2px",
          borderRadius: "4px",
          border: "1px solid black"
        }}
      >
        <FormModalEliminar
          modalShow={this.state.modalEliminarFormacionShow}
          modal={this.state.modalEliminarFormacion}
          eliminar={this.eliminarFormacion.bind(this)}
          toggleModal={this.toggleModalEliminarFormacion.bind(this)}
        />

        <Row style={{ marginBottom: 15 }}>
          <Col sm="4">
            <Label>cambiar los datos de {this.props.formacion.nombre}</Label>
          </Col>
          <Col sm="8" style={{ textAlign: "right" }}>
            <Button
              id="eliminar"
              name="formacion"
              onClick={() =>
                this.setState({ modalEliminarFormacionShow: true })
              }
              color="danger"
            >
              Eliminar formacion: {this.props.formacion.nombre}
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////// estudios //////////////////////////////// */}
        <Row>
          <Col sm="4">
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.formacion.estudios}{" "}
            </h5>
          </Col>
          <Col sm="4">
            <Input
              id="estudios"
              value={this.state.estudios}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`estudios de la formacion`}
            />
          </Col>
          <Col sm="4">
            <Button
              id="estudios"
              name="formacion"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar estudios
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////////////////////// centroFormativo ////////////////////////////////// */}
        <Row style={{ paddingTop: 5 }}>
          <Col sm="4">
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.formacion.centroFormativo}{" "}
            </h5>
          </Col>
          <Col sm="4">
            <Input
              id="centroFormativo"
              value={this.state.centroFormativo}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`centroFormativo`}
            />
          </Col>
          <Col sm="4">
            <Button
              id="centroFormativo"
              name="formacion"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar centroFormativo
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////// centroUrlPic //////////////////////////////// */}
        <FormPictures
          src={this.props.formacion.centroUrlPic}
          pics={this.props.pics}
          id={this.props.formacion.centroFormativo}
          name={"formacion"}
          subirChunk={this.subirChunk.bind(this)}
          subirFoto={this.subirFoto.bind(this)}
        />

        {/* ////////////////////////////////////////////////////////// centroUrl ////////////////////////////////// */}
        <Row style={{ paddingTop: 5 }}>
          <Col sm="4">
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.formacion.centroUrl}{" "}
            </h5>
          </Col>
          <Col sm="4">
            <Input
              id="centroUrl"
              value={this.state.centroUrl}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`centroUrl`}
            />
          </Col>
          <Col sm="4">
            <Button
              id="centroUrl"
              name="formacion"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar centroUrl
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////////////////////// fecha ////////////////////////////////// */}
        <Row style={{ paddingTop: 5 }}>
          <Col sm="4">
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.formacion.fecha}{" "}
            </h5>
          </Col>
          <Col sm="4">
            <Input
              id="fecha"
              value={this.state.fecha}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`fecha`}
            />
          </Col>
          <Col sm="4">
            <Button
              id="fecha"
              name="formacion"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar fecha
            </Button>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default FormFormacion;
