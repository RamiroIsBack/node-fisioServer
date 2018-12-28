import React, { Component } from "react";
import { Button, FormGroup, Row, Col, Input } from "reactstrap";

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
      formacionIndex: this.props.formacionIndex,
      partID: e.target.name,
      chunkID: e.target.id,
      chunkData:
        e.target.id === "centroUrlPic"
          ? this.props.pics[this.props.formacion.centroFormativo]
          : this.state.parameters[e.target.id]
    });
  }
  guardarPic(e) {
    this.props.subirFoto(e.target.id, e.target.files[0]);
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
              <p style={{ marginBottom: 0, marginLeft: "5px" }}>
                esto hay en la base de datos:
              </p>
            </Col>
            <Col sm="8">
              <img
                src={this.props.formacion.centroUrlPic}
                className="img-responsive"
                alt="foto en base de datos"
                style={{ height: "70px" }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm="4">
              <p>elige una foto </p>
              <Input
                type="file"
                id={this.props.formacion.centroFormativo}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: this.props.pics
                    ? this.props.pics[this.props.formacion.centroFormativo] ===
                      ""
                      ? "yellow"
                      : "transparent"
                    : "yellow"
                }}
                onChange={this.guardarPic.bind(this)}
              />
            </Col>
            <Col sm="8">
              <p>
                hasta que no se rellene este campo no est'a la foto lista para
                subir a la base de datos, espera a que haya algo escrito aqui
                para darle al boton de subir foto
              </p>
              <Input
                value={
                  this.props.pics
                    ? this.props.pics[this.props.formacion.centroFormativo]
                    : ""
                }
                readOnly="readonly"
              />
            </Col>
          </Row>
          <Button
            id="centroUrlPic"
            onClick={this.subirChunk.bind(this)}
            name="formacion"
            color="primary"
            disabled={
              this.props.pics
                ? this.props.pics[this.props.formacion.centroFormativo] === ""
                  ? true
                  : false
                : true
            }
          >
            Subir Foto de {this.props.formacion.centroFormativo}
          </Button>
        </FormGroup>
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
