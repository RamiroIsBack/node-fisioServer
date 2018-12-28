import React, { Component } from "react";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

import FormFormacion from "./FormFormacion";
import FormTecnica from "./FormTecnica";
import FormPictures from "./FormPictures";

class FormPersonas extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        apellido: "",
        cargo: "",
        urlPic: ""
      }
    };
  }

  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }
  subirFoto(id, archivo) {
    if (archivo) {
      this.props.subirFoto(id, archivo);
    } else {
      console.log("no hay archivo q subir" + archivo);
    }
  }
  subirChunkTecnicaOrFormacion(chunkObject) {
    chunkObject.personaIndex = this.props.personaIndex;
    this.props.subirChunk(chunkObject);
  }
  subirChunk(e) {
    if (e.chunkID) {
      //this is not the event object
      let dataObject = Object.assign({}, e);
      dataObject.chunkID = "urlPic";
      dataObject.personaIndex = this.props.personaIndex;
      this.props.subirChunk(dataObject);
    } else {
      this.props.subirChunk({
        personaIndex: this.props.personaIndex,
        partID: e.target.name,
        chunkID: e.target.id,
        chunkData:
          e.target.id === "urlPic"
            ? this.props.pics[this.props.persona.nombre]
            : this.state.parameters[e.target.id]
      });
    }
  }
  newTecnica(e) {
    console.log("new tecnica!! rass!@!");
  }
  newFormacion(e) {
    console.log("new formacion!! rass!@!");
  }
  subirFotoFormacion(id, archivo) {
    if (archivo) {
      this.props.subirFoto(id, archivo);
    } else {
      console.log("no hay archivo q subir" + archivo);
    }
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <FormGroup
          style={{
            padding: "2px",
            borderRadius: "4px",
            border: "2px solid black"
          }}
        >
          <Label>cambiar los datos de {this.props.persona.nombre}</Label>

          {/* //////////////////////////////////////////////////////////nombre////////////////////////////////// */}
          <Row>
            <Col sm="4">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.persona.nombre}{" "}
              </h5>
            </Col>
            <Col sm="4">
              <Input
                id="nombre"
                value={this.state.nombre}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`Perico`}
              />
            </Col>
            <Col sm="4">
              <Button
                id="nombre"
                name="persona"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar nombre
              </Button>
            </Col>
          </Row>
          {/* //////////////////////////////////////////////////////////apellido////////////////////////////////// */}
          <Row style={{ paddingTop: 5 }}>
            <Col sm="4">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.persona.apellido}{" "}
              </h5>
            </Col>
            <Col sm="4">
              <Input
                id="apellido"
                value={this.state.apellido}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`de los palotes`}
              />
            </Col>
            <Col sm="4">
              <Button
                id="apellido"
                name="persona"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar apellido
              </Button>
            </Col>
          </Row>
          {/* //////////////////////////////////////////////////////////cargo////////////////////////////////// */}

          <Row style={{ paddingTop: 5 }}>
            <Col sm="4">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.persona.cargo}{" "}
              </h5>
            </Col>
            <Col sm="4">
              <Input
                id="cargo"
                value={this.state.cargo}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`mago nivel 3`}
              />
            </Col>
            <Col sm="4">
              <Button
                id="cargo"
                name="persona"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar cargo
              </Button>
            </Col>
          </Row>
          {/* //////////////////////////////////////////////////////////textoPersona////////////////////////////////// */}
          <Row
            style={{
              width: "92%",
              marginLeft: 20,
              borderRadius: "4px",
              border: "1px solid gray",
              paddingTop: 5
            }}
          >
            <Col
              style={{
                padding: 2,
                paddingLeft: 4,
                backgroundColor: "gainsboro"
              }}
              sm="11"
            >
              <p>{this.props.persona.textoPersona} </p>
            </Col>
            <Col sm="9">
              <Input
                id="textoPersona"
                type="textarea"
                rows="5"
                value={this.state.textoPersona}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`habla en general de la persona, los estudios van a parte`}
              />
            </Col>
            <Col sm="3">
              <Button
                id="textoPersona"
                name="persona"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar texto personal
              </Button>
            </Col>
          </Row>

          <br />

          {/* //////////////////////////////////////////////////////////urlPic////////////////////////////////// */}
          <FormPictures
            src={this.props.persona.urlPic}
            pics={this.props.pics}
            id={this.props.persona.nombre}
            name={"persona"}
            subirChunk={this.subirChunk.bind(this)}
            subirFoto={this.subirFoto.bind(this)}
          />

          {/* ///////////////////////////////    tecnicas    ////////////////////////////// */}
          <FormGroup
            style={{
              margin: 10,
              padding: "2px",
              borderRadius: "4px",
              border: "1px solid black"
            }}
          >
            <div style={{ padding: "15px" }}>
              <h3 style={{ display: "inline" }}>
                Tecnicas de {this.props.persona.nombre}{" "}
              </h3>
              <p style={{ display: "inline" }}>tambien puedes anadir una</p>
              <Button
                id="newPerson"
                onClick={this.newTecnica.bind(this)}
                color="success"
                style={{ display: "inline" }}
              >
                + Nueva tecnica
              </Button>
            </div>
            {this.props.persona ? (
              this.props.persona.tecnicas.map((tecnica, index) => {
                return (
                  <FormTecnica
                    key={index}
                    tecnicaIndex={index}
                    tecnica={tecnica}
                    subirChunk={this.subirChunkTecnicaOrFormacion.bind(this)}
                  />
                );
              })
            ) : (
              <div />
            )}
          </FormGroup>

          {/* ///////////////////////////////    formacion ////////////////////////////// */}
          <FormGroup
            style={{
              margin: "10px",
              marginTop: "25px",
              padding: "2px",
              borderRadius: "4px",
              border: "1px solid black"
            }}
          >
            <div style={{ padding: "15px" }}>
              <h3 style={{ display: "inline" }}>
                Formacion de {this.props.persona.nombre}{" "}
              </h3>
              <p style={{ display: "inline" }}>tambien puedes anadir </p>
              <Button
                id="newPerson"
                onClick={this.newFormacion.bind(this)}
                color="success"
                style={{ display: "inline" }}
              >
                + estudios
              </Button>
            </div>
            {this.props.persona ? (
              this.props.persona.formacion.map((formacion, index) => {
                return (
                  <FormFormacion
                    key={index}
                    formacionIndex={index}
                    formacion={formacion}
                    pics={this.props.pics}
                    subirChunk={this.subirChunkTecnicaOrFormacion.bind(this)}
                    subirFoto={this.subirFotoFormacion.bind(this)}
                  />
                );
              })
            ) : (
              <div />
            )}
          </FormGroup>
        </FormGroup>
      </div>
    );
  }
}

export default FormPersonas;
