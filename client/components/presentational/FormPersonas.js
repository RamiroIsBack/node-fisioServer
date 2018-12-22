import React, { Component } from "react";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

import FormPictures from "./FormPictures";

class FormPersonas extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        apellido: "",
        cargo: ""
      }
    };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }
  guardarPic(e) {
    this.props.subirFoto(e.target.id, e.target.files[0]);
  }

  subirChunk(e) {
    this.props.subirChunk(100, e.target.id, this.state.parameters[e.target.id]);
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <FormGroup
          style={{
            padding: "2px",
            borderRadius: "4px",
            border: "1px solid black"
          }}
        >
          <Label for="textoLargo">
            cambiar los datos de {this.props.persona.nombre}
          </Label>

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
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar texto personal
              </Button>
            </Col>
          </Row>

          <br />

          {/* //////////////////////////////////////////////////////////urlPic////////////////////////////////// */}
          <FormGroup
            style={{
              padding: "2px",
              borderRadius: "4px",
              width: "92%",
              marginLeft: 20,
              border: "1px solid gray"
            }}
          >
            <Row>
              <Col sm="4">
                <h4>Foto</h4>
                <Label style={{ marginBottom: 0, marginLeft: "5px" }}>
                  esto hay en la base de datos:
                </Label>
              </Col>
              <Col sm="8">
                <img
                  src={this.props.persona.urlPic}
                  className="img-responsive"
                  alt="foto en base de datos"
                  style={{ height: "100px" }}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm="4">
                <Label>elige una foto </Label>
                <Input
                  type="file"
                  id={this.props.persona.nombre}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: this.props.pics
                      ? this.props.pics[this.props.persona.nombre] === ""
                        ? "yellow"
                        : "transparent"
                      : "yellow"
                  }}
                  onChange={this.guardarPic.bind(this)}
                />
              </Col>
              <Col sm="8">
                <Label>
                  hasta que no se rellene este campo no est'a la foto lista para
                  subir a la base de datos, espera a que haya algo escrito aqui
                  para darle al boton de subir foto
                </Label>
                <Input
                  value={
                    this.props.pics
                      ? this.props.pics[this.props.persona.nombre]
                      : ""
                  }
                  readOnly="readonly"
                />
              </Col>
            </Row>
            <Button
              id={this.props.persona.nombre}
              onClick={this.subirChunk.bind(this)}
              color="primary"
              disabled={
                this.props.pics
                  ? this.props.pics[this.props.persona.nombre] === ""
                    ? true
                    : false
                  : true
              }
            >
              Subir Foto
            </Button>
          </FormGroup>
        </FormGroup>
      </div>
    );
  }
}

export default FormPersonas;
