import React, { Component } from "react";
import { Button, Row, FormGroup, Label, Input, Col } from "reactstrap";

class InicioForm extends Component {
  constructor() {
    super();
    this.state = {
      newPic0Src: "",
      newPic1Src: "",
      newPic2Src: "",
      newPic3Src: "",
      parameters: {
        inicioTextoCorto: "",
        inicioTextoLargo: "",
        items: [
          {
            src: ""
          },
          {
            src: ""
          },
          {
            src: ""
          },
          {
            src: ""
          }
        ]
      }
    };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }
  guardarPic(e) {
    //upload pick to firebase bucket
  }

  subirChunk(e) {
    this.props.subirChunk(e.target.id, this.state.parameters[e.target.id]);
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
            que aparece arriba en la pagina de inicio
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
            que aparece arriba en la pagina de inicio
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
            onClick={this.subirChunk.bind(this)}
            color="primary"
          >
            Subir Texto Largo
          </Button>
        </FormGroup>
        <br />
        <div>
          <h3 style={{ display: "inline" }}>Carousell de fotos </h3>
          <p style={{ display: "inline" }}>
            que luego son tambien fotos de los diferentes servicios
          </p>
        </div>
        <br />
        <FormGroup
          style={{
            padding: "2px",
            borderRadius: "4px",
            border: "1px solid black"
          }}
        >
          <Row>
            <Col sm="4">
              <h4>Foto de Fisioterapia</h4>
              <Label style={{ marginBottom: 0, marginLeft: "5px" }}>
                esto hay en la base de datos:
              </Label>
            </Col>
            <Col sm="8">
              <img
                src={this.props.copy ? this.props.copy.items[0].src : ""}
                id="picFisioDB"
                className="img-responsive"
                alt="foto fisio en base de datos"
                style={{ height: "100px" }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm="4">
              <Label>elige una foto para Fisioterapia</Label>
              <Input
                type="file"
                id="picFisio"
                number="0"
                style={{ padding: "10px" }}
                onChange={this.guardarPic.bind(this)}
              />
            </Col>
            <Col sm="8">
              <Label>
                hasta que no se rellene este campo no est'a la foto lista para
                subir a la base de datos, espera a que haya algo escrito aqui
                para darle al boton de subir foto
              </Label>
              <Input
                value={this.state.newPic0Src}
                id="textoCortoDB"
                readOnly="readonly"
              />
            </Col>
          </Row>
          <Button
            id="inicioPicFisio"
            onClick={this.subirChunk.bind(this)}
            color="primary"
          >
            Subir Foto
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default InicioForm;
