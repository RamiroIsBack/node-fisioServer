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
import { ETIME } from "constants";
class FormBono extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        bono: {
          modalidad: "elige modalidad", //sin bono,bono,mensual
          dias: "numero o dias de la semana",
          precio: "cuanto cuesta"
        },
        bonoSecundario: {
          modalidad: "sin bono", //sin bono,bono,mensual
          dias: "numero o dias de la semana",
          precio: "cuanto cuesta"
        }
      },
      dropdownBono: false,
      dropdownBonoSecundario: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.giveMeModalidad = this.giveMeModalidad.bind(this);
    this.giveMeDias = this.giveMeDias.bind(this);
    this.giveMePrecio = this.giveMePrecio.bind(this);
    this.subirBono = this.subirBono.bind(this);
  }
  subirBono(e) {
    let bonos = {
      partID: e.target.id,
      chunkID: "bonos",
      chunkData: this.state.parameters
    };
    if (bonos.chunkData.bono.modalidad === "sin bono") {
      bonos.chunkData.bono.dias = "";
      bonos.chunkData.bono.precio = "";
      bonos.chunkData.bonoSecundario = {
        modalidad: "sin bono",
        dias: "",
        precio: ""
      };
    } else if (bonos.chunkData.bonoSecundario.modalidad === "sin bono") {
      bonos.chunkData.bonoSecundario.dias = "";
      bonos.chunkData.bonoSecundario.precio = "";
    }
    this.props.subirBono(bonos);
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);

    e.target.id === "modalidad"
      ? (obj.parameters[e.target.title][e.target.id] = e.target.name)
      : (obj.parameters[e.target.title][e.target.id] = e.target.value);
    this.setState(obj);
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
          {this.state.parameters[cual].modalidad}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            title={cual}
            id="modalidad"
            name="sin bono"
            onClick={this.handleOnChange}
          >
            sin bono
          </DropdownItem>

          <DropdownItem
            title={cual}
            id="modalidad"
            name="bono"
            onClick={this.handleOnChange}
          >
            bono
          </DropdownItem>
          <DropdownItem
            title={cual}
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
  giveMeDias(cual) {
    return this.state.parameters[cual].modalidad !== "elige modalidad" &&
      this.state.parameters[cual].modalidad !== "sin bono" ? (
      <div>
        <p style={{ margin: 0 }}>dias</p>
        <Input
          title={cual}
          id="dias"
          name={this.state.parameters[cual].dias}
          onChange={this.handleOnChange}
          placeholder={this.state.parameters[cual].dias}
        />
      </div>
    ) : (
      <h4>sin {cual}?</h4>
    );
  }
  giveMePrecio(cual) {
    return this.state.parameters[cual].modalidad !== "elige modalidad" &&
      this.state.parameters[cual].modalidad !== "sin bono" ? (
      <div>
        {" "}
        <p style={{ margin: 0 }}>precio</p>
        <Input
          title={cual}
          id="precio"
          name={this.state.parameters[cual].precio}
          onChange={this.handleOnChange}
          placeholder={this.state.parameters[cual].precio}
        />
      </div>
    ) : (
      <div />
    );
  }
  render() {
    return (
      <div>
        <Row style={{ paddingTop: 5 }}>
          <Col sm="3">
            {this.props.bonos && (
              <div
                style={{
                  backgroundColor: "gainsboro"
                }}
              >
                <h5 style={{ display: "inline-block" }}>
                  {this.props.bonos.bono.modalidad} {this.props.bonos.bono.dias}
                  {" : "}
                  {this.props.bonos.bono.precio}
                </h5>
                {this.props.bonos.bono.precio ? (
                  <h6 style={{ display: "inline-block" }}>Euros</h6>
                ) : (
                  ""
                )}
              </div>
            )}
          </Col>
          <Col sm="2">{this.giveMeModalidad("bono")}</Col>
          <Col sm="3">{this.giveMeDias("bono")}</Col>
          <Col sm="2">{this.giveMePrecio("bono")}</Col>
        </Row>
        <Row style={{ paddingTop: 5 }}>
          <Col sm="3">
            {this.props.bonos && this.props.bonos.bonoSecundario && (
              <div
                style={{
                  backgroundColor: "gainsboro"
                }}
              >
                <h5 style={{ display: "inline-block" }}>
                  {this.props.bonos.bonoSecundario.modalidad}{" "}
                  {this.props.bonos.bonoSecundario.dias}
                  {" : "}
                  {this.props.bonos.bonoSecundario.precio}
                </h5>
                {this.props.bonos.bonoSecundario.precio ? (
                  <h6 style={{ display: "inline-block" }}>Euros</h6>
                ) : (
                  ""
                )}
              </div>
            )}
          </Col>
          <Col sm="2">{this.giveMeModalidad("bonoSecundario")}</Col>
          <Col sm="3">{this.giveMeDias("bonoSecundario")}</Col>
          <Col sm="2">{this.giveMePrecio("bonoSecundario")}</Col>
        </Row>
        <Row>
          <Col sm="4">
            <Button
              id="bonos"
              name="servicio"
              onClick={this.subirBono} //need to do it
              color="primary"
              disabled={
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
              Cambiar Bonos
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormBono;
