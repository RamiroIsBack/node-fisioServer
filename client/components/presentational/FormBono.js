import React, { Component } from "React";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
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
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters.bono[e.target.id] = e.target.name;
    this.setState(obj);
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
        <Col sm="3">
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
        </Col>
        <Col sm="3">
          <Input
            id="precio"
            name={this.state.precio}
            onChange={this.handleOnChange}
            placeholder={`cuanto cuesta`}
          />
        </Col>
        <Col sm="3">
          <Button
            id="bono"
            name="servicio"
            onClick={this.props.subirBono} //need to do it
            color="primary"
            disabled={
              //not working
              this.state.parameters.bono.modalidad !== "elige modalidad" ||
              this.state.parameters.bono.modalidad !== "sin bono"
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
