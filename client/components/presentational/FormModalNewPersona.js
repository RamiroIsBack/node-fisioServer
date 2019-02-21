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
      apellido: "",
      cargo: "",
      textoPersona: "",
      formacion: [],
      urlPic: "",
      tecnicas: [],
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
  createNewPersona(e) {
    let obj = Object.assign({}, this.state);
    obj.urlPic = this.props.pics["newPersona"];
    this.props.createNewPersona(obj);
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
                <h5>nombre :</h5>
              </Col>
              <Col sm="8">
                <Input
                  id="nombre"
                  value={this.state.nombre}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`Peludo`}
                />
              </Col>
            </Row>

            {/* //////////////////////////////////////////////////////////apellido////////////////////////////////// */}
            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">
                <h5>apellido:</h5>
              </Col>
              <Col sm="4">
                <Input
                  id="apellido"
                  value={this.state.apellido}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`muchoPelooo`}
                />
              </Col>
            </Row>
            {/* //////////////////////////////////////////////////////////cargo////////////////////////////////// */}

            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">
                <h5>cargo:</h5>
              </Col>
              <Col sm="4">
                <Input
                  id="cargo"
                  value={this.state.cargo}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`enderazador de tibias`}
                />
              </Col>
            </Row>
            {/*////////////////////////////////////////////// textoPersona /////////////////////////////////*/}
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
                <p>texto largo sobre la Persona:</p>
              </Col>
              <Col sm="11">
                <Input
                  id="textoPersona"
                  type="textarea"
                  rows="5"
                  value={this.state.textoPersona}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`habla en general del Personaje`}
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
                      id="newPersona"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor: this.props.pics
                          ? this.props.pics["newPersona"] === ""
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
                        this.props.pics ? this.props.pics["newPersona"] : ""
                      }
                      readOnly="readonly"
                    />
                  </Col>
                </Row>
              </FormGroup>
            </div>
            {/*///////////////////////////////tecnicas y formacion //////////////////////////*/}
            <Row>
              <h3> Tecnicas y Formacion lo rellenas uno vez creado </h3>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.createNewPersona.bind(this)}
            disabled={
              this.props.pics
                ? this.props.pics["newPersona"] === ""
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
