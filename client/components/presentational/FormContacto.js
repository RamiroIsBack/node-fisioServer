import React, { Component } from "react";
import { Button, FormGroup, Row, Col, Input } from "reactstrap";

import FormDireccion from "./FormDireccion";

class FormContacto extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        telCopy: "",
        mailCopy: "",
        horario: "",
        cookiesTextoLargo: "",
        cookiesTextoCorto: ""
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
      //this is not the event object, is comming from direccion
      let dataObject = Object.assign({}, e);
      this.props.subirChunk(dataObject);
    } else {
      this.props.subirChunk({
        partID: e.target.name,
        chunkID:
          e.target.id === "telCopy" || e.target.id === "emailCopy"
            ? "urlLink"
            : e.target.id,
        chunkData: this.state.parameters[e.target.id]
      });
    }
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
        {/* ////////////////////////////////////////// telCopy //////////////////////////////// */}
        <Row>
          <Col sm="4">
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.contacto.telCopy.urlLink}{" "}
            </h5>
          </Col>
          <Col sm="4">
            <Input
              id="telCopy"
              value={this.state.telCopy}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`telefono de contacto`}
            />
          </Col>
          <Col sm="4">
            <Button
              id="telCopy"
              name="telCopy"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar telefono
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////// emailCopy //////////////////////////////// */}
        <Row>
          <Col sm="4">
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.contacto.emailCopy.urlLink}{" "}
            </h5>
          </Col>
          <Col sm="4">
            <Input
              id="emailCopy"
              value={this.state.emailCopy}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`email de contacto`}
            />
          </Col>
          <Col sm="4">
            <Button
              id="emailCopy"
              name="emailCopy"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar email
            </Button>
          </Col>
        </Row>

        {/* ////////////////////////////////////////////////////////// horario ////////////////////////////////// */}
        <Row style={{ paddingTop: 5 }}>
          <Col sm="4">
            <h5 style={{ backgroundColor: "gainsboro" }}>
              {this.props.contacto.horario}{" "}
            </h5>
          </Col>
          <Col sm="4">
            <Input
              type="textarea"
              rows="3"
              id="horario"
              value={this.state.horario}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`horario de atencion al publico`}
            />
          </Col>
          <Col sm="4">
            <Button
              id="horario"
              name="contacto"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar Horario
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////// direccion //////////////////////////////// */}
        <FormDireccion
          direccion={this.props.contacto.direccion}
          name={"direccion"}
          subirChunk={this.subirChunk.bind(this)}
        />

        {/* ////////////////////////////////////////////////////////// cookiesTextoCorto ////////////////////////////////// */}
        <Row style={{ width: "95%", paddingTop: 5 }}>
          <h5 style={{ backgroundColor: "gainsboro" }}>
            {this.props.contacto.cookiesTextoCorto}{" "}
          </h5>
        </Row>
        <Row style={{ width: "95%", paddingTop: 5 }}>
          <Col sm="10">
            <Input
              type="textarea"
              rows="5"
              id="cookiesTextoCorto"
              value={this.state.cookiesTextoCorto}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`cookiesTextoCorto`}
            />
          </Col>
          <Col sm="2">
            <Button
              id="cookiesTextoCorto"
              name="contacto"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar cookiesTextoCorto
            </Button>
          </Col>
        </Row>
        {/* ////////////////////////////////////////////////////////// cookiesTextoLargo ////////////////////////////////// */}
        <Row style={{ width: "90%", paddingTop: 5 }}>
          <h5 style={{ backgroundColor: "gainsboro" }}>
            {this.props.contacto.cookiesTextoLargo}{" "}
          </h5>
        </Row>
        <Row style={{ width: "95%", paddingTop: 5 }}>
          <Col sm="10">
            <Input
              type="textarea"
              rows="10"
              id="cookiesTextoLargo"
              value={this.state.cookiesTextoLargo}
              onChange={this.handleOnChange.bind(this)}
              placeholder={`cookiesTextoLargo`}
            />
          </Col>
          <Col sm="2">
            <Button
              id="cookiesTextoLargo"
              name="contacto"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              Cambiar cookiesTextoLargo
            </Button>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default FormContacto;
