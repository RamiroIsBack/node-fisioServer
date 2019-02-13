import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";

class InstalacionesForm extends Component {
  constructor() {
    super();
    this.state = {
      parameters: { instalacionesTextoCorto: "", instalacionesTextoLargo: "" }
    };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }
  subirChunk(e) {
    this.props.subirChunk({
      partID: e.target.name,
      chunkID: e.target.id,
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
          <h4 style={{ display: "inline" }}>Texto Corto </h4>
          <p style={{ display: "inline" }}>
            que aparece arriba en la pagina de instalaciones
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
            value={
              this.props.copy
                ? this.props.copy.instalacionesTextoCorto
                : "cargando....."
            }
            id="textoCortoDB"
            readOnly="readonly"
          />
          <Label for="textoCorto">introduce lo q quieres que aparezca</Label>
          <Input
            id="instalacionesTextoCorto"
            placeholder="la mejor clinica de fisioterapia del mundo :P"
            value={this.state.instalacionesTextoCorto}
            onChange={this.handleOnChange.bind(this)}
          />
          <Button
            id="instalacionesTextoCorto"
            name="texto"
            onClick={this.subirChunk.bind(this)}
            color="primary"
          >
            Subir Texto Corto
          </Button>
        </FormGroup>

        <br />
        <div>
          <h4 style={{ display: "inline" }}>Texto Largo </h4>
          <p style={{ display: "inline" }}>
            que aparece en medio en la pagina de instalaciones
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
                ? this.props.copy.instalacionesTextoLargo
                : "cargando....."
            }
            id="textoLargoDB"
            readOnly="readonly"
          />
          <Label for="textoLargo">introduce lo q quieres que aparezca</Label>
          <Input
            type="textarea"
            rows="5"
            id="instalacionesTextoLargo"
            value={this.state.instalacionesTextoLargo}
            onChange={this.handleOnChange.bind(this)}
            placeholder={`bla bla bla ......
            bla bla bla bla bla!`}
          />
          <Button
            id="instalacionesTextoLargo"
            name="texto"
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

export default InstalacionesForm;
