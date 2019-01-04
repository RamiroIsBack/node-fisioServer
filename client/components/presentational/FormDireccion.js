import React, { Component } from "react";
import { Button, FormGroup, Row, Col, Input } from "reactstrap";

class FormDireccion extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        urlLink: "",
        info: "",
        detalles: ""
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
      partID: e.target.name,
      chunkID: e.target.id,
      chunkData: this.state.parameters[e.target.id]
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
        {/* ////////////////////////////////////////// urlLink //////////////////////////////// */}
        <Row style={{ display: "block", paddingTop: 5 }}>
          <Input
            readOnly={true}
            value={this.props.direccion.urlLink}
            type="textarea"
            rows="2"
          />
        </Row>
        <Row>
          <Col sm="9">
            <Input
              type="textarea"
              rows="2"
              id="urlLink"
              value={this.state.urlLink}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`url de googleMaps`}
            />
          </Col>
          <Col sm="3">
            <Button
              id="urlLink"
              name="direccion"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar punto en googleMaps
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////////////////////// nombre ////////////////////////////////// */}
        <Row style={{ paddingTop: 5 }}>
          <Col sm="4">
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.direccion.nombre}{" "}
            </h5>
          </Col>
          <Col sm="4">
            <Input
              id="nombre"
              value={this.state.nombre}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`nombre`}
            />
          </Col>
          <Col sm="4">
            <Button
              id="nombre"
              name="direccion"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar direccion
            </Button>
          </Col>
        </Row>

        {/* ////////////////////////////////////////////////////////// info ////////////////////////////////// */}
        <Row style={{ width: "95%", paddingTop: 5 }}>
          <h5 style={{ backgroundColor: "gainsboro" }}>
            {this.props.direccion.info}{" "}
          </h5>
        </Row>
        <Row style={{ paddingTop: 5 }}>
          <Col sm="9">
            <Input
              id="info"
              type="textarea"
              rows="3"
              value={this.state.info}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`info`}
            />
          </Col>
          <Col sm="3">
            <Button
              id="info"
              name="direccion"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar info
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////////////////////// detalles ////////////////////////////////// */}
        <Row style={{ width: "95%", paddingTop: 5 }}>
          <h5 style={{ backgroundColor: "gainsboro" }}>
            {this.props.direccion.detalles}{" "}
          </h5>
        </Row>
        <Row style={{ paddingTop: 5 }}>
          <Col sm="9">
            <Input
              id="detalles"
              type="textarea"
              rows="10"
              value={this.state.detalles}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`detalles`}
            />
          </Col>
          <Col sm="3">
            <Button
              id="detalles"
              name="direccion"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar detalles
            </Button>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default FormDireccion;
