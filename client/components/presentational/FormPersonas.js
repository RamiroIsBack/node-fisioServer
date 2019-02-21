import React, { Component } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import FormFormacion from "./FormFormacion";
import FormPictures from "./FormPictures";
import FormModalNewFormacion from "./FormModalNewFormacion";
import FormModalEliminar from "./FormModalEliminar";

class FormPersonas extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        apellido: "",
        cargo: "",
        urlPic: "",
        newTecnica: { nombre: "asignar tecnica", id: "" }
      },
      dropDownTecnica: false,

      modalNewFormacionShow: false,
      modalNewFormacion: {
        modalName: "Quires mostrar un nuevo Formacion?",
        actionName: "crear el Formacion"
      },

      modalEliminarPersonaShow: false,
      modalEliminarPersona: {
        modalName: "Quires eliminar esta Persona?",
        actionName: "eliminar Persona",
        modalBodie:
          "Si lo eliminas se pierden los datos, si quieres copiar algun texto o algo, hazlo antes de eliminar el Persona"
      }
    };
  }

  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }
  dropdownChange(e) {
    let obj = Object.assign({}, this.state.parameters);
    obj["newTecnica"] = { nombre: e.target.name, id: e.target.id };
    this.setState({ parameters: obj });
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
    var personaObject = {
      updatedPersona: Object.assign({}, this.props.persona),
      personaIndex: this.props.personaIndex,
      partID: "persona"
    };
    if (e.chunkID) {
      //this is not the event object
      let dataObject = Object.assign({}, e);

      if (dataObject.chunkID === "urlPic") {
        personaObject.updatedPersona.urlPic = this.props.pics[
          this.props.persona.nombre
        ];
      }
      if (dataObject.partID === "formacion") {
        // formacion field
        if (dataObject.chunkID === "newFormacion") {
          personaObject.updatedPersona.formacion.push(dataObject.newFormacion);
        } else if (dataObject.chunkID === "eliminar") {
          personaObject.updatedPersona.formacion = personaObject.updatedPersona.formacion.filter(
            (formacion, index) => dataObject.formacionIndex !== index
          );
        } else {
          personaObject.updatedPersona.formacion[dataObject.formacionIndex][
            dataObject.chunkID
          ] = dataObject.chunkData;
        }
      } else {
        console.log("partID no corresponde con formacion", dataObject.partID);
        return;
      }
    } else {
      if (e.target.name === "newTecnica") {
        personaObject.updatedPersona.tecnicas.push(
          this.state.parameters[e.target.id]
        );
      } else if (e.target.name === "eliminarTecnica") {
        personaObject.updatedPersona.tecnicas = personaObject.updatedPersona.tecnicas.filter(
          (tecnica, index) => e.target.id !== index
        );
      } else {
        personaObject.updatedPersona[e.target.id] = this.state.parameters[
          e.target.id
        ];
      }
      this.props.subirChunk(personaObject);
    }
  }
  eliminarPersona() {
    let dataObject = {};
    dataObject.chunkID = "eliminar";
    dataObject.partID = "persona";
    dataObject.personaIndex = this.props.personaIndex;
    this.props.subirChunk(dataObject);
    this.toggleModalEliminarPersona();
  }
  toggleModalEliminarPersona() {
    this.setState({
      modalEliminarPersonaShow: !this.state.modalEliminarPersonaShow
    });
  }
  createNewFormacion(newFormacion) {
    this.subirChunk({
      newFormacion,
      partID: "formacion",
      chunkID: "newFormacion"
    });
    this.toggleModalNewFormacion();
  }
  toggleModalNewFormacion() {
    this.setState({ modalNewFormacionShow: !this.state.modalNewFormacionShow });
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
        <FormModalEliminar
          modalShow={this.state.modalEliminarPersonaShow}
          modal={this.state.modalEliminarPersona}
          eliminar={this.eliminarPersona.bind(this)}
          toggleModal={this.toggleModalEliminarPersona.bind(this)}
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
              <Label>cambiar los datos de {this.props.persona.nombre}</Label>
            </Col>
            <Col sm="8" style={{ textAlign: "right" }}>
              <Button
                id="eliminar"
                name="persona"
                onClick={() =>
                  this.setState({ modalEliminarPersonaShow: true })
                }
                color="danger"
              >
                Eliminar Persona: {this.props.persona.nombre}
              </Button>
            </Col>
          </Row>
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
              <h3>Tecnicas de {this.props.persona.nombre} </h3>

              <div>
                {this.props.persona.tecnicas.map((tecnica, tecnicaIndex) => {
                  return (
                    <div
                      key={tecnicaIndex}
                      style={{
                        display: "inline",
                        padding: "2px"
                      }}
                    >
                      <p
                        style={{
                          display: "inline",
                          backgroundColor: "gainsboro"
                        }}
                      >
                        {tecnica.nombre}{" "}
                      </p>
                      <Button
                        id={tecnicaIndex}
                        name="eliminarTecnica"
                        onClick={this.subirChunk.bind(this)}
                        color="danger"
                        style={{
                          margin: 0,
                          height: "20px",
                          paddingTop: 0
                        }}
                      >
                        x
                      </Button>
                    </div>
                  );
                })}
              </div>

              <p style={{ display: "inline" }}>
                tambien puedes anadir una tecnica:{" "}
              </p>

              <Row style={{ paddingTop: 5 }}>
                <Col sm="3">
                  <h5>nueva tecnica:</h5>
                </Col>
                <Col sm="6">
                  <Dropdown
                    direction="right"
                    isOpen={this.state.dropDownTecnica}
                    toggle={() => {
                      this.setState({
                        dropDownTecnica: !this.state.dropDownTecnica
                      });
                    }}
                  >
                    <DropdownToggle caret>
                      {this.state.parameters.newTecnica.nombre}
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.props.tecnicas ? (
                        this.props.tecnicas.map((tecnica, index) => (
                          <DropdownItem
                            key={index}
                            id={tecnica._id}
                            name={tecnica.nombre}
                            onClick={this.dropdownChange.bind(this)}
                          >
                            {tecnica.nombre}
                          </DropdownItem>
                        ))
                      ) : (
                        <div />
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col sm="3">
                  <Button
                    name="newTecnica"
                    id=""
                    onClick={this.subirChunk.bind(this)}
                    color="primary"
                    disabled={
                      this.state.parameters.newTecnica.nombre ===
                      "asignar tecnica"
                        ? true
                        : false
                    }
                  >
                    Asignar esta tecnica
                  </Button>
                </Col>
              </Row>

              <p>
                si quieres crearla nueva, hazlo en la seccion de tecnicas y
                luego se la asignas a la persona aqui ;)
              </p>
            </div>
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
              <FormModalNewFormacion
                modalShow={this.state.modalNewFormacionShow}
                modal={this.state.modalNewFormacion}
                pics={this.props.pics}
                formacionArray={this.props.persona.formacion}
                toggleModal={this.toggleModalNewFormacion.bind(this)}
                createNewFormacion={this.createNewFormacion.bind(this)}
                subirFoto={this.subirFoto.bind(this)}
              />
              <Button
                id="newPerson"
                onClick={() => this.setState({ modalNewFormacion: true })}
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
