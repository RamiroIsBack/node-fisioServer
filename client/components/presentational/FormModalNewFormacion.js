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
      studios: "",
      centroFormativo: "",
      centroUrlPic: "",
      centroUrl: "",
      fecha: ""
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
    obj.centroUrlPic = this.props.pics["newFormacion"];
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
            {/* //////////////////////////////////////////////////////////estudios////////////////////////////////// */}
            <Row>
              <Col sm="4">
                <h5>estdios:</h5>
              </Col>
              <Col sm="8">
                <Input
                  id="estudios"
                  value={this.state.nombre}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`Arakiri con espada samurai`}
                />
              </Col>
            </Row>
            {/* //////////////////////////////////////////////////////////fecha////////////////////////////////// */}
            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">
                <h5>fecha:</h5>
              </Col>
              <Col sm="4">
                <Input
                  id="fecha"
                  value={this.state.fecha}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`fecha en que se gradua como maestro saolin del valle oscuro`}
                />
              </Col>
            </Row>
            {/* //////////////////////////////////////////////////////////centroFormativo////////////////////////////////// */}
            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">
                <h5>centroFormativo:</h5>
              </Col>
              <Col sm="4">
                <Input
                  id="centroFormativo"
                  value={this.state.centroFormativo}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`lo aprendi'o del maestro Tsakamura en Hokaido University`}
                />
              </Col>
            </Row>
            {/* //////////////////////////////////////////////////////////centroUrl////////////////////////////////// */}

            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">
                <h5>centroUrl:</h5>
              </Col>
              <Col sm="4">
                <Input
                  id="centroUrl"
                  value={this.state.centroUrl}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`pagina web del centro formativo`}
                />
              </Col>
            </Row>

            {/* //////////////////////////////////////////////////////////centroUrlPic////////////////////////////////// */}
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
                    <Label>elige una foto de la uni o el curso </Label>
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
