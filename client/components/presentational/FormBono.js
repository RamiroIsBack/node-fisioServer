import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle
} from "reactstrap";
class FormBono extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        bono: {
          modalidad: "elige modalidad", //sin bono,bono,mensual
          dias: "numero o dias de la semana",
          precio: "cuanto cuesta"
        }
      },
      dropdownBono: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.giveMeModalidad = this.giveMeModalidad.bind(this);
    this.giveMeDias = this.giveMeDias.bind(this);
    this.giveMePrecio = this.giveMePrecio.bind(this);
    this.subirBono = this.subirBono.bind(this);
  }
  subirBono(e) {
    let bono = {
      partID: e.target.id,
      chunkID: "bono",
      chunkData: this.state.parameters.bono
    };
    if (bono.chunkData.modalidad === "sin bono") {
      bono.chunkData.dias = "";
      bono.chunkData.precio = "";
    }
    this.props.subirBono(bono);
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    e.target.id === "modalidad"
      ? (obj.parameters.bono[e.target.id] = e.target.name)
      : (obj.parameters.bono[e.target.id] = e.target.value);
    this.setState(obj);
  }
  giveMeModalidad() {
    return (
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
            onClick={this.handleOnChange}
          >
            sin bono
          </DropdownItem>
          <DropdownItem
            id="modalidad"
            name="bono"
            onClick={this.handleOnChange}
          >
            bono
          </DropdownItem>
          <DropdownItem
            id="modalidad"
            name="mensualidad"
            onClick={this.handleOnChange}
          >
            mensualidad
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
  giveMeDias() {
    return this.state.parameters.bono.modalidad !== "elige modalidad" &&
      this.state.parameters.bono.modalidad !== "sin bono" ? (
      <div>
        <p style={{ margin: 0 }}>dias</p>
        <Input
          id="dias"
          name={this.state.parameters.bono.dias}
          onChange={this.handleOnChange}
          placeholder={this.state.parameters.bono.dias}
        />
      </div>
    ) : (
      <h4>sin modalidad de bono?</h4>
    );
  }
  giveMePrecio() {
    return this.state.parameters.bono.modalidad !== "elige modalidad" &&
      this.state.parameters.bono.modalidad !== "sin bono" ? (
      <div>
        {" "}
        <p style={{ margin: 0 }}>precio</p>
        <Input
          id="precio"
          name={this.state.parameters.bono.precio}
          onChange={this.handleOnChange}
          placeholder={this.state.parameters.bono.precio}
        />
      </div>
    ) : (
      <div />
    );
  }
  render() {
    return (
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
              this.state.parameters.bono.modalidad !== "elige modalidad" &&
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
    );
  }
}

export default FormBono;
