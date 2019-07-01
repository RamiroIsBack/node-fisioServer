import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle
} from "reactstrap";

import FormPictures from "./FormPictures";
import FormModalEliminar from "./FormModalEliminar";

class ServiciosForm extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        precio: 0,
        duracion: 0,
        servicioTextoLargo: "",
        bonoNombre: "cambiar bono",
        bono: {
          modalidad: "elige modalidad", //sin bono,bono,mensual
          dias: "numero o dias de la semana",
          precio: "cuanto cuesta"
        },
        urlPic: ""
      },
      modalEliminarServicioShow: false,
      modalEliminarServicio: {
        modalName: "Quires eliminar esta Servicio?",
        actionName: "eliminar Servicio",
        modalBodie: `Si lo eliminas se pierden los datos, si quieres copiar algun texto o algo, hazlo antes de eliminar la Servicio. `
      },
      dropdownBono: false
    };
  }

  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }
  dropdownBonoChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters.bono[e.target.id] = e.target.name;
    this.setState(obj);
  }
  subirFoto(id, archivo) {
    if (archivo) {
      this.props.subirFoto(id, archivo);
    } else {
      console.log("no hay archivo q subir" + archivo);
    }
  }

  eliminarServicio() {
    let dataObject = {};
    dataObject.chunkID = "eliminar";
    dataObject.partID = "servicio";
    dataObject.servicioIndex = this.props.servicioIndex;
    this.props.subirChunk(dataObject);
    this.toggleModalEliminarServicio();
  }
  toggleModalEliminarServicio() {
    this.setState({
      modalEliminarServicioShow: !this.state.modalEliminarServicioShow
    });
  }

  subirChunk(e) {
    if (e.chunkID) {
      //this is not the event object
      let dataObject = Object.assign({}, e);
      dataObject.chunkID = e.partID;
      dataObject.partID = "servicio";
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

  render() {
    return (
      <div style={{ padding: 15 }}>
        <FormModalEliminar
          modalShow={this.state.modalEliminarServicioShow}
          modal={this.state.modalEliminarServicio}
          eliminar={this.eliminarServicio.bind(this)}
          toggleModal={this.toggleModalEliminarServicio.bind(this)}
        />
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
                onClick={() =>
                  this.setState({ modalEliminarServicioShow: true })
                }
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
          {/* //////////////////////////////////////////////////////////bono////////////////////////////////// */}
          <Row style={{ paddingTop: 5 }}>
            <Col sm="3">
              <div
                style={{
                  backgroundColor: "gainsboro"
                }}
              >
                <h5 style={{ display: "inline-block" }}>
                  {this.props.servicio.bono.modalidad}{" "}
                  {this.props.servicio.bono.dias}
                  {" : "}
                  {this.props.servicio.bono.precio}
                </h5>
                {this.props.servicio.bono.precio ? (
                  <h6 style={{ display: "inline-block" }}>Euros</h6>
                ) : (
                  ""
                )}
              </div>
            </Col>
            <Col sm="3">
              <Dropdown
                direction="down"
                isOpen={this.state.dropDownBono}
                toggle={() => {
                  this.setState({
                    dropDownBono: !this.state.dropDownBono
                  });
                }}
              >
                <DropdownToggle caret>
                  {this.state.parameters.bono.modalidad}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    id="modalidad"
                    name="sin bono"
                    onClick={this.dropdownBonoChange.bind(this)}
                  >
                    sin bono
                  </DropdownItem>
                  <DropdownItem
                    id="modalidad"
                    name="bono"
                    onClick={this.dropdownBonoChange.bind(this)}
                  >
                    bono
                  </DropdownItem>
                  <DropdownItem
                    id="modalidad"
                    name="mensualidad"
                    onClick={this.dropdownBonoChange.bind(this)}
                  >
                    mensualidad
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col sm="3">
              <Input
                id="precio"
                value={this.state.precio}
                onChange={this.handleOnChange.bind(this)}
                placeholder={`cuanto cuesta`}
              />
            </Col>
            <Col sm="3">
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
            name={"urlPic"}
            subirChunk={this.subirChunk.bind(this)}
            subirFoto={this.subirFoto.bind(this)}
          />
          {/* //////////////////////////////////////////////////////////urlIcono////////////////////////////////// */}
          <FormPictures
            src={this.props.servicio.urlIcono}
            pics={this.props.pics}
            id={`servicioIcono${this.props.servicio.nombre}`}
            name={"urlIcono"}
            subirChunk={this.subirChunk.bind(this)}
            subirFoto={this.subirFoto.bind(this)}
          />
        </FormGroup>
      </div>
    );
  }
}

export default ServiciosForm;
