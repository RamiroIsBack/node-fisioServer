import React, { Component } from "react";
import {
  Label,
  Button,
  FormGroup,
  Row,
  Col,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import FormModalEliminar from "./FormModalEliminar";
import FormPictures from "./FormPictures";

class FormTecnica extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        servicioNombre: "cambiar servicio",
        texto: "",
        urlPic: ""
      },
      modalEliminarTecnicaShow: false,
      modalEliminarTecnica: {
        modalName: "Quires eliminar esta Tecnica?",
        actionName: "eliminar Tecnica",
        modalBodie: `Si lo eliminas se pierden los datos, si quieres copiar algun texto o algo, hazlo antes de eliminar la tecnica. `
      },
      dropDownServicio: false
    };
  }

  dropdownChange(e) {
    let obj = Object.assign({}, this.state.parameters);
    obj["servicioNombre"] = e.target.name;
    this.setState({ parameters: obj });
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
    let dataObject = {};
    dataObject.chunkID = "eliminar";
    dataObject.partID = "tecnica";
    dataObject.tecnicaIndex = this.props.tecnicaIndex;
    this.props.subirChunk(dataObject);
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
          <br />
          {/* //////////////////////////////////////////////////////////servicio////////////////////////////////// */}
          <Row style={{ paddingTop: 5 }}>
            <Col sm="3">
              <h5>servicio:</h5>
            </Col>
            <Col sm="3">
              <h5 style={{ backgroundColor: "gainsboro" }}>
                {this.props.tecnica.servicioNombre}{" "}
              </h5>
            </Col>
            <Col sm="3">
              <Dropdown
                direction="right"
                isOpen={this.state.dropDownServicio}
                toggle={() => {
                  this.setState({
                    dropDownServicio: !this.state.dropDownServicio
                  });
                }}
              >
                <DropdownToggle caret>
                  {this.state.parameters.servicioNombre}
                </DropdownToggle>
                <DropdownMenu>
                  {this.props.servicios.map((servicio, index) => (
                    <DropdownItem
                      key={index}
                      name={servicio.nombre}
                      onClick={this.dropdownChange.bind(this)}
                    >
                      {servicio.nombre}
                    </DropdownItem>
                  ))}
                  <DropdownItem
                    name="ninguno"
                    onClick={this.dropdownChange.bind(this)}
                  >
                    ninguno
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col sm="3">
              <Button
                id="servicioNombre"
                name="tecnica"
                onClick={this.subirChunk.bind(this)}
                color="primary"
                disabled={
                  this.state.parameters.servicioNombre === "cambiar servicio"
                    ? true
                    : false
                }
              >
                Cambiar servicio
              </Button>
            </Col>
          </Row>

          {/* //////////////////////////////////////////////////////////urlPic////////////////////////////////// */}
          {this.props.tecnica.urlPic !== "" && (
            <Button
              name="tecnica"
              id="urlPic"
              outline
              color="danger"
              onClick={this.subirChunk.bind(this)}
            >
              Quitar la foto
            </Button>
          )}
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
