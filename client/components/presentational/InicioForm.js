import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class InicioForm extends Component {
  constructor() {
    super();
    this.state = {
      parameters: {
        inicioTextoCorto: "",
        inicioTextoLargo: "",
        anuncioTexto: "",
      },
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
      chunkData:
        e.target.id === "anuncio"
          ? !this.props.copy.anuncio
          : this.state.parameters[e.target.id],
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
        {/* anuncio Texto al principio */}
        <div>
          <h4 style={{ display: "inline" }}>Anuncio Texto </h4>
          <p style={{ display: "inline" }}>
            que aparece por encima de todo en una ventana para mensajes
            importantes
          </p>
          <div>
            <p
              style={{
                display: "inline",

                backgroundColor: "yellow",
              }}
            >
              {this.props.copy
                ? this.props.copy.anuncio
                  ? "el anuncio est'a activo"
                  : "el anuncio est'a desactivado"
                : "cargando....."}
            </p>
            <Button
              style={{ display: "inline" }}
              id="anuncio"
              name="texto"
              onClick={this.subirChunk.bind(this)}
              color="primary"
            >
              {this.props.copy
                ? this.props.copy.anuncio
                  ? "Desactivar"
                  : "Activar"
                : "cargando....."}
            </Button>
          </div>
        </div>
        <FormGroup
          style={{
            padding: "2px",
            borderRadius: "4px",
            border: "1px solid black",
          }}
        >
          <Label style={{ marginBottom: 0, marginLeft: "5px" }}>
            esto hay en la base de datos:
          </Label>
          <Input
            value={
              this.props.copy ? this.props.copy.anuncioTexto : "cargando....."
            }
            id="anuncioTextoDB"
            readOnly="readonly"
          />
          <Label for="anuncioTexto">introduce lo q quieres que aparezca</Label>
          <Input
            id="anuncioTexto"
            placeholder="Otra pandemia noooooo!!"
            value={this.state.parameters.anuncioTexto}
            onChange={this.handleOnChange.bind(this)}
          />
          <Button
            id="anuncioTexto"
            name="texto"
            onClick={this.subirChunk.bind(this)}
            color="primary"
          >
            Subir anuncio Texto
          </Button>
        </FormGroup>

        <br />

        {/* texto corto */}

        <div>
          <h4 style={{ display: "inline" }}>Texto Corto </h4>
          <p style={{ display: "inline" }}>
            que aparece arriba en la pagina de inicio
          </p>
        </div>
        <FormGroup
          style={{
            padding: "2px",
            borderRadius: "4px",
            border: "1px solid black",
          }}
        >
          <Label style={{ marginBottom: 0, marginLeft: "5px" }}>
            esto hay en la base de datos:
          </Label>
          <Input
            value={
              this.props.copy
                ? this.props.copy.inicioTextoCorto
                : "cargando....."
            }
            id="textoCortoDB"
            readOnly="readonly"
          />
          <Label for="textoCorto">introduce lo q quieres que aparezca</Label>
          <Input
            id="inicioTextoCorto"
            placeholder="la mejor clinica de fisioterapia del mundo :P"
            value={this.state.inicioTextoCorto}
            onChange={this.handleOnChange.bind(this)}
          />
          <Button
            id="inicioTextoCorto"
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
            que aparece abajo en la pagina de inicio
          </p>
        </div>
        <FormGroup
          style={{
            padding: "2px",
            borderRadius: "4px",
            border: "1px solid black",
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
                ? this.props.copy.inicioTextoLargo
                : "cargando....."
            }
            id="textoLargoDB"
            readOnly="readonly"
          />
          <Label for="textoLargo">introduce lo q quieres que aparezca</Label>
          <Input
            type="textarea"
            rows="5"
            id="inicioTextoLargo"
            value={this.state.inicioTextoLargo}
            onChange={this.handleOnChange.bind(this)}
            placeholder={`bla bla bla ......
              bla bla bla bla bla!`}
          />
          <Button
            id="inicioTextoLargo"
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

export default InicioForm;
