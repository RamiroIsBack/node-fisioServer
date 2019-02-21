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
  ModalFooter
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

      formacionTextoLargo: "",

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
  createNewFormacion(e) {
    let obj = Object.assign({}, this.state);
    obj.urlPic = this.props.pics["newFormacion"];
    this.props.createNewFormacion(obj);
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
                <h5>nombre del Formacion:</h5>
              </Col>
              <Col sm="8">
                <Input
                  id="nombre"
                  value={this.state.nombre}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`nombre del Formacion prestado`}
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
            {/*////////////////////////////////////////////// formacionTextoLargo /////////////////////////////////*/}
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
                <p>texto largo sobre el Formacion:</p>
              </Col>
              <Col sm="11">
                <Input
                  id="formacionTextoLargo"
                  type="textarea"
                  rows="5"
                  value={this.state.formacionTextoLargo}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`habla en general del Formacion`}
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
                      id="newFormacion"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor: this.props.pics
                          ? this.props.pics["newFormacion"] === ""
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
                        this.props.pics ? this.props.pics["newFormacion"] : ""
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
            onClick={this.createNewFormacion.bind(this)}
            disabled={
              this.props.pics
                ? this.props.pics["newFormacion"] === ""
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
