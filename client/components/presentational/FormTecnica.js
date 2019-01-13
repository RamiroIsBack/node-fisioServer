import React, { Component } from "react";
import { Button, FormGroup, Row, Col, Input } from "reactstrap";

class FormTecnica extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        servicio: "",
        texto: ""
      }
    };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }

  subirChunk(e) {
    this.props.subirChunk({
      tecnicaIndex: this.props.tecnicaIndex,
      partID: e.target.name,
      chunkID: e.target.id,
      chunkData: this.state.parameters[e.target.id]
    });
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
        </FormGroup>
      </div>
    );
  }
}

export default FormTecnica;
