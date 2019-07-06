import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle
} from "reactstrap";

class FormModal extends React.Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      precio: 0,
      duracion: 0,
      bono: {
        modalidad: "Bono",
        numero: 0,
        precio: 0
      },
      urlPic: "",

      servicioTextoLargo: "",

      tecnicas: []
    };
  }
  guardarPic(e) {
    this.props.subirFoto(e.target.id, e.target.files[0]);
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }
  createNewServicio(e) {
    let obj = Object.assign({}, this.state);
    obj.urlPic = this.props.pics["newServicio"];
    obj.urlIcono = this.props.pics["newServicioIcono"];
    this.props.createNewServicio(obj);
  }
  render() {
    return (
      <Modal
        isOpen={this.props.modalShow}
        toggle={this.props.toggleModal}
        backdrop={true}
      >
        <ModalHeader toggle={this.props.toggleModal}>
          {this.props.modal.modalName}
        </ModalHeader>
        <ModalBody>
          <FormGroup
            style={{
              padding: "2px",
              borderRadius: "4px",
              border: "2px solid black"
            }}
          >
            {/* //////////////////////////////////////////////////////////nombre////////////////////////////////// */}
            <Row>
              <Col sm="4">
                <h5>nombre del servicio:</h5>
              </Col>
              <Col sm="8">
                <Input
                  id="nombre"
                  value={this.state.nombre}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`nombre del servicio prestado`}
                />
              </Col>
            </Row>

            {/* //////////////////////////////////////////////////////////precio////////////////////////////////// */}
            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">
                <h5>precio:</h5>
              </Col>
              <Col sm="4">
                <Input
                  id="precio"
                  value={this.state.precio}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`cuanto cuesta`}
                />
              </Col>
            </Row>
            {/* //////////////////////////////////////////////////////////duracion////////////////////////////////// */}

            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">
                <h5>duracion:</h5>
              </Col>
              <Col sm="4">
                <Input
                  id="duracion"
                  value={this.state.duracion}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`cuanto dura la sesion`}
                />
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
                    {this.props.bono.modalidad} {this.props.bono.dias}
                    {" : "}
                    {this.props.bono.precio}
                  </h5>
                  {this.props.bono.precio ? (
                    <h6 style={{ display: "inline-block" }}>Euros</h6>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
              <Col sm="2">{this.giveMeModalidad()}</Col>
              <Col sm="3">{this.giveMeDias()}</Col>
              <Col sm="2">{this.giveMePrecio()}</Col>

              <Col sm="2">
                <Button
                  id="bono"
                  name="servicio"
                  onClick={this.subirBono} //need to do it
                  color="primary"
                  disabled={
                    //not working
                    this.state.parameters.bono.modalidad !==
                      "elige modalidad" &&
                    this.state.parameters.bono.dias !==
                      "numero o dias de la semana" &&
                    this.state.parameters.bono.precio !== "cuanto cuesta"
                      ? false
                      : this.state.parameters.bono.modalidad === "sin bono"
                      ? false
                      : true
                  }
                >
                  Cambiar Bono
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
                  paddingLeft: 4
                }}
                sm="12"
              >
                <p>texto largo sobre el servicio:</p>
              </Col>
              <Col sm="11">
                <Input
                  id="servicioTextoLargo"
                  type="textarea"
                  rows="5"
                  value={this.state.servicioTextoLargo}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`habla en general del servicio`}
                />
              </Col>
            </Row>

            <br />

            {/* //////////////////////////////////////////////////////////urlPic////////////////////////////////// */}
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
                    <Label>elige una foto </Label>
                    <Input
                      type="file"
                      id="newServicio"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor: this.props.pics
                          ? this.props.pics["newServicio"] === ""
                            ? "yellow"
                            : "transparent"
                          : "yellow"
                      }}
                      onChange={this.guardarPic.bind(this)}
                    />
                  </Col>
                  <Col sm="8">
                    <Label>
                      hasta que no se rellene este campo no est'a la foto lista
                      para subir a la base de datos, espera a que haya algo
                      escrito aqui para darle al boton de subir foto
                    </Label>
                    <Input
                      value={
                        this.props.pics ? this.props.pics["newServicio"] : ""
                      }
                      readOnly="readonly"
                    />
                  </Col>
                </Row>
              </FormGroup>
            </div>
            {/* //////////////////////////////////////////////////////////urlIcono////////////////////////////////// */}
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
                    <Label>elige un Icono </Label>
                    <Input
                      type="file"
                      id="newServicioIcono"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor: this.props.pics
                          ? this.props.pics["newServicioIcono"] === ""
                            ? "yellow"
                            : "transparent"
                          : "yellow"
                      }}
                      onChange={this.guardarPic.bind(this)}
                    />
                  </Col>
                  <Col sm="8">
                    <Label>
                      hasta que no se rellene este campo no est'a la foto lista
                      para subir a la base de datos, espera a que haya algo
                      escrito aqui para darle al boton de subir foto
                    </Label>
                    <Input
                      value={
                        this.props.pics
                          ? this.props.pics["newServicioIcono"]
                          : ""
                      }
                      readOnly="readonly"
                    />
                  </Col>
                </Row>
              </FormGroup>
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.createNewServicio.bind(this)}
            disabled={
              this.props.pics
                ? this.props.pics["newServicio"] === "" ||
                  this.props.pics["newServicioIcono"] === ""
                  ? true
                  : false
                : true
            }
          >
            {this.props.modal.actionName}
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default FormModal;
