import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class FormModalNewTecnica extends React.Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        nombre: "",
        texto: "",
        servicioNombre: "elige servicio"
      },
      dropDownServicio: false
    };
  }
  guardarPic(e) {
    this.props.subirFoto(e.target.id, e.target.files[0]);
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state.parameters);
    obj[e.target.id] = e.target.value;
    this.setState({ parameters: obj });
  }
  createNewTecnica(e) {
    let obj = Object.assign({}, this.state.parameters);
    obj.urlPic = this.props.pics["newTecnica"];
    this.props.createNewTecnica(obj);
  }
  dropdownChange(e) {
    let obj = Object.assign({}, this.state.parameters);
    obj["servicioNombre"] = e.target.name;
    this.setState({ parameters: obj });
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
                <h5>nombre de la tecnica:</h5>
              </Col>
              <Col sm="8">
                <Input
                  id="nombre"
                  value={this.state.parameters.nombre}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`nombre de la tecnica `}
                />
              </Col>
            </Row>

            {/* //////////////////////////////////////////////////////////servicio////////////////////////////////// */}
            <Row style={{ paddingTop: 5 }}>
              <Col sm="4">
                <h5>servicio:</h5>
              </Col>
              <Col sm="8">
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
            </Row>

            {/*////////////////////////////////////////////// texto /////////////////////////////////*/}
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
                <p>texto sobre la tecnica:</p>
              </Col>
              <Col sm="11">
                <Input
                  id="texto"
                  type="textarea"
                  rows="5"
                  value={this.state.parameters.texto}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`habla en general de la tecnica`}
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
                    <p>elige una foto </p>
                    <Input
                      type="file"
                      id="newTecnica"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor: this.props.pics
                          ? this.props.pics["newTecnica"] === ""
                            ? "yellow"
                            : "transparent"
                          : "yellow"
                      }}
                      onChange={this.guardarPic.bind(this)}
                    />
                  </Col>
                  <Col sm="8">
                    <p>
                      hasta que no se rellene este campo no est'a la foto lista
                      para subir a la base de datos, espera a que haya algo
                      escrito aqui para darle al boton de subir foto
                    </p>
                    <Input
                      value={
                        this.props.pics ? this.props.pics["newTecnica"] : ""
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
            onClick={this.createNewTecnica.bind(this)}
            disabled={
              this.state.parameters["texto"] === "" ||
              this.state.parameters["nombre"] === ""
                ? true
                : false
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

export default FormModalNewTecnica;
