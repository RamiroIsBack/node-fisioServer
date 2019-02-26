import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";

class EquipoForm extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        equipoTextoLargo: ""
      }
    };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }

  subirChunk(e) {
    this.props.subirChunk({
      partID: "persona",
      chunkID: "equipoTextoLargo",
      chunkData: this.state.parameters[e.target.id]
    });
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <p>
          primero te aparece lo que hay en la base de datos (en gris, no lo
          puedes modificar), que es lo q esta apareciendo en la web hasta ahora,
          debajo tienes hueco para escribir o subir una foto y debajo un boton
          para hacer el cambio:
        </p>
        <br />
        <div>
          <h4 style={{ display: "inline" }}>Texto Largo </h4>
          <p style={{ display: "inline" }}>
            que aparece abajo en la pagina de equipo
          </p>
        </div>
        <FormGroup
          style={{
            padding: "2px",
            borderRadius: "4px",
            border: "1px solid black"
          }}
        >
          <Label style={{ marginBottom: 0, marginLeft: "5px" }}>
            esto hay en la base de datos:
          </Label>
          <Input
            type="textarea"
            rows="5"
            value={
              this.props.copy
                ? this.props.copy.equipoTextoLargo
                : "cargando....."
            }
            id="textoLargoDB"
            readOnly="readonly"
          />
          <Label for="textoLargo">introduce lo q quieres que aparezca</Label>
          <Input
            type="textarea"
            rows="5"
            id="equipoTextoLargo"
            value={this.state.equipoTextoLargo}
            onChange={this.handleOnChange.bind(this)}
            placeholder={`bla bla bla ......
              bla bla bla bla bla!`}
          />
          <Button
            id="equipoTextoLargo"
            onClick={this.subirChunk.bind(this)}
            color="primary"
          >
            Subir Texto Largo
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default EquipoForm;
