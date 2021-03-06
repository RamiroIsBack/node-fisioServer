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
      bonos: {
        bono: {
          modalidad: "elige modalidad", //sin bono,bono,mensual
          dias: "",
          precio: ""
        },
        bonoSecundario: {
          modalidad: "sin bono", //sin bono,bono,mensual
          dias: "",
          precio: ""
        }
      },
      urlPic: "",

      servicioTextoLargo: "",
      dropdownBono: false,
      dropdownBonoSecundario: false,
      tecnicas: []
    };
    this.giveMeModalidad = this.giveMeModalidad.bind(this);
    this.giveMeDias = this.giveMeDias.bind(this);
    this.giveMePrecio = this.giveMePrecio.bind(this);
  }
  guardarPic(e) {
    this.props.subirFoto(e.target.id, e.target.files[0]);
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    e.target.id === "bono" || e.target.id === "bonoSecundario"
      ? e.target.title === "modalidad"
        ? (obj.bonos[e.target.id][e.target.title] = e.target.name)
        : (obj.bonos[e.target.id][e.target.title] = e.target.value)
      : (obj[e.target.id] = e.target.value);
    this.setState(obj);
  }
  createNewServicio(e) {
    let obj = Object.assign({}, this.state);
    obj.urlPic = this.props.pics["newServicio"];
    obj.urlIcono = this.props.pics["newServicioIcono"];
    this.props.createNewServicio(obj);
  }
  giveMeModalidad(cual) {
    let dropdown = cual === "bono" ? "dropdownBono" : "dropdownBonoSecundario";
    return (
      <Dropdown
        direction="down"
        isOpen={this.state[dropdown]}
        toggle={() => {
          this.setState({
            [dropdown]: !this.state[dropdown]
          });
        }}
      >
        <DropdownToggle caret>
          {this.state.bonos[cual].modalidad}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            id={cual}
            title="modalidad"
            name="sin bono"
            onClick={this.handleOnChange.bind(this)}
          >
            sin bono
          </DropdownItem>
          <DropdownItem
            id={cual}
            title="modalidad"
            name="bono"
            onClick={this.handleOnChange.bind(this)}
          >
            bono
          </DropdownItem>
          <DropdownItem
            id={cual}
            title="modalidad"
            name="mensualidad"
            onClick={this.handleOnChange.bind(this)}
          >
            mensualidad
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
  giveMeDias(cual) {
    return this.state.bonos[cual].modalidad !== "elige modalidad" &&
      this.state.bonos[cual].modalidad !== "sin bono" ? (
      <div>
        <p style={{ margin: 0 }}>dias</p>
        <Input
          id={cual}
          title="dias"
          onChange={this.handleOnChange.bind(this)}
          placeholder={this.state.bonos[cual].dias}
        />
      </div>
    ) : (
      <h4>sin {cual}?</h4>
    );
  }
  giveMePrecio(cual) {
    return this.state.bonos[cual].modalidad !== "elige modalidad" &&
      this.state.bonos[cual].modalidad !== "sin bono" ? (
      <div>
        {" "}
        <p style={{ margin: 0 }}>precio</p>
        <Input
          id={cual}
          title="precio"
          onChange={this.handleOnChange.bind(this)}
          placeholder={this.state.bonos[cual].precio}
        />
      </div>
    ) : (
      <div />
    );
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
            <Row>
              <Col sm="10">
                <h4
                  style={{
                    backgroundColor: "yellow",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Precio y duracion solo numeros!
                </h4>
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
              <Col sm="4">{this.giveMeModalidad("bono")}</Col>
              <Col sm="5">{this.giveMeDias("bono")}</Col>
              <Col sm="3">{this.giveMePrecio("bono")}</Col>
            </Row>
            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">{this.giveMeModalidad("bonoSecundario")}</Col>
              <Col sm="5">{this.giveMeDias("bonoSecundario")}</Col>
              <Col sm="3">{this.giveMePrecio("bonoSecundario")}</Col>
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
