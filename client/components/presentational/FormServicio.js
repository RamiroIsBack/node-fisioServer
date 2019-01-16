import React, { Component } from "react";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

import FormTecnica from "./FormTecnica";
import FormPictures from "./FormPictures";
import FormModalNewTecnica from "./FormModalNewTecnica";

class ServiciosForm extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        precio: 0,
        duracion: 0,
        servicioTextoLargo: "",
        bono: {
          modalidad: "",
          numero: 0,
          precio: 0
        },
        urlPic: ""
      },
      modalNewTecnicaShow: false,
      modalNewTecnica: {
        modalName: "Quires mostrar una nueva Tecnica?",
        actionName: "crear la Tecnica"
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
  subirChunkTecnica(chunkObject) {
    chunkObject.servicioIndex = this.props.servicioIndex;
    this.props.subirChunk(chunkObject);
  }
  subirChunk(e) {
    if (e.chunkID) {
      //this is not the event object
      let dataObject = Object.assign({}, e);
      dataObject.chunkID = "urlPic";
      dataObject.servicioIndex = this.props.servicioIndex;
      this.props.subirChunk(dataObject);
    } else {
      this.props.subirChunk({
        servicioIndex: this.props.servicioIndex,
        partID: e.target.name,
        chunkID: e.target.id,
        chunkData:
          e.target.id === "urlPic"
            ? this.props.pics[this.props.servicio.nombre]
            : this.state.parameters[e.target.id]
      });
    }
  }
  createNewTecnica(newTecnica) {
    this.subirChunkTecnica({
      newTecnica,
      partID: "tecnica",
      chunkID: "newTecnica"
    });
    this.toggleModalNewTecnica();
  }
  eliminarTecnica(tecnicaIndex) {
    this.props.subirChunk({
      tecnicaIndex,
      servicioIndex: this.props.servicioIndex,
      partID: "tecnica",
      chunkID: "eliminar",
      chunkData: undefined
    });
  }
  toggleModalNewTecnica() {
    this.setState({ modalNewTecnicaShow: !this.state.modalNewTecnicaShow });
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
          <Row style={{ marginBottom: 15 }}>
            <Col sm="4">
              <Label>cambiar los datos de {this.props.servicio.nombre}</Label>
            </Col>
            <Col sm="8" style={{ textAlign: "right" }}>
              <Button
                id="eliminar"
                name="servicio"
                onClick={this.subirChunk.bind(this)}
                color="danger"
              >
                Eliminar servicio: {this.props.servicio.nombre}
              </Button>
            </Col>
          </Row>

          {/* //////////////////////////////////////////////////////////nombre////////////////////////////////// */}
          <Row>
            <Col sm="4">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.servicio.nombre}{" "}
              </h5>
            </Col>
            <Col sm="4">
              <Input
                id="nombre"
                value={this.state.nombre}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`nombre del servicio prestado`}
              />
            </Col>
            <Col sm="4">
              <Button
                id="nombre"
                name="servicio"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar nombre
              </Button>
            </Col>
          </Row>

          {/* //////////////////////////////////////////////////////////precio////////////////////////////////// */}
          <Row style={{ paddingTop: 5 }}>
            <Col sm="4">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.servicio.precio}{" "}
              </h5>
            </Col>
            <Col sm="4">
              <Input
                id="precio"
                value={this.state.precio}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`cuanto cuesta`}
              />
            </Col>
            <Col sm="4">
              <Button
                id="precio"
                name="servicio"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar precio
              </Button>
            </Col>
          </Row>
          {/* //////////////////////////////////////////////////////////duracion////////////////////////////////// */}

          <Row style={{ paddingTop: 5 }}>
            <Col sm="4">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.servicio.duracion}{" "}
              </h5>
            </Col>
            <Col sm="4">
              <Input
                id="duracion"
                value={this.state.duracion}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`cuanto dura la sesion`}
              />
            </Col>
            <Col sm="4">
              <Button
                id="duracion"
                name="servicio"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar duracion
              </Button>
            </Col>
          </Row>
          {/*////////////////////////////////////////////// servicioTextoLargo /////////////////////////////////*/}
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
              <p>{this.props.servicio.servicioTextoLargo} </p>
            </Col>
            <Col sm="9">
              <Input
                id="servicioTextoLargo"
                type="textarea"
                rows="5"
                value={this.state.servicioTextoLargo}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`habla en general del servicio`}
              />
            </Col>
            <Col sm="3">
              <Button
                id="servicioTextoLargo"
                name="servicio"
                onClick={this.subirChunk.bind(this)}
                color="primary"
              >
                Cambiar texto largo del servicio
              </Button>
            </Col>
          </Row>

          <br />

          {/* //////////////////////////////////////////////////////////urlPic////////////////////////////////// */}
          <FormPictures
            src={this.props.servicio.urlPic}
            pics={this.props.pics}
            id={`servicio${this.props.servicio.nombre}`}
            name={"servicio"}
            subirChunk={this.subirChunk.bind(this)}
            subirFoto={this.subirFoto.bind(this)}
          />

          {/* ///////////////////////////////    tecnicas    ////////////////////////////// */}
          <FormModalNewTecnica
            modalShow={this.state.modalNewTecnicaShow}
            modal={this.state.modalNewTecnica}
            servicio={this.props.servicio.nombre}
            toggleModal={this.toggleModalNewTecnica.bind(this)}
            createNewTecnica={this.createNewTecnica.bind(this)}
          />

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
                Tecnicas de {this.props.servicio.nombre}{" "}
              </h3>
              <p style={{ display: "inline" }}>tambien puedes anadir una</p>
              <Button
                id="newPerson"
                onClick={() => this.setState({ modalNewTecnicaShow: true })}
                color="success"
                style={{ display: "inline" }}
              >
                + Nueva tecnica
              </Button>
            </div>
            {this.props.servicio ? (
              this.props.servicio.tecnicas.map((tecnica, index) => {
                return (
                  <div key={index}>
                    <FormTecnica
                      tecnicaIndex={index}
                      tecnica={tecnica}
                      subirChunk={this.subirChunkTecnica.bind(this)}
                      eliminarTecnica={this.eliminarTecnica.bind(this)}
                    />
                  </div>
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

export default ServiciosForm;
