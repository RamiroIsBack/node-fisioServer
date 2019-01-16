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
  ModalFooter
} from "reactstrap";

class FormModalNewTecnica extends React.Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      texto: ""
    };
  }

  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }
  createNewTecnica(e) {
    let obj = Object.assign({}, this.state);
    obj.servicio = this.props.servicio;
    this.props.createNewTecnica(obj);
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
                  value={this.state.nombre}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`nombre de la tecnica `}
                />
              </Col>
            </Row>

            {/* //////////////////////////////////////////////////////////servicio////////////////////////////////// */}
            <Row style={{ paddingTop: 5 }}>
              <h5>servicio: {this.props.servicio}</h5>
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
                  value={this.state.texto}
                  onChange={this.handleOnChange.bind(this)}
                  placeholder={`habla en general de la tecnica`}
                />
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.createNewTecnica.bind(this)}
            disabled={
              this.state["texto"] === "" || this.state["nombre"] === ""
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
