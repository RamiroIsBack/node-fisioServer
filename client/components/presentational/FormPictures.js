import React, { Component } from "react";
import { Button, Row, FormGroup, Label, Input, Col } from "reactstrap";

class FormPictures extends Component {
  guardarPic(e) {
    this.props.subirFoto(e.target.id, e.target.files[0]);
  }

  subirChunk(e) {
    let numero = 0;
    if (e.target.id === "picOsteo") {
      numero = 1;
    } else if (e.target.id === "picPodo") {
      numero = 2;
    } else if (e.target.id === "picPilates") {
      numero = 3;
    }
    this.props.subirChunk(numero, e.target.id, this.props.pics[e.target.id]);
  }

  render() {
    return (
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
              <h4>Foto de {this.props.servicio}</h4>
              <Label style={{ marginBottom: 0, marginLeft: "5px" }}>
                esto hay en la base de datos:
              </Label>
            </Col>
            <Col sm="8">
              <img
                src={
                  this.props.copy
                    ? this.props.copy.items[this.props.number].src
                    : ""
                }
                className="img-responsive"
                alt="foto en base de datos"
                style={{ height: "100px" }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm="4">
              <Label>elige una foto para {this.props.servicio}</Label>
              <Input
                type="file"
                id={this.props.id}
                number={this.props.number}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: this.props.pics
                    ? this.props.pics[this.props.id] === ""
                      ? "yellow"
                      : "transparent"
                    : "yellow"
                }}
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
                value={this.props.pics ? this.props.pics[this.props.id] : ""}
                readOnly="readonly"
              />
            </Col>
          </Row>
          <Button
            id={this.props.id}
            onClick={this.subirChunk.bind(this)}
            color="primary"
            disabled={
              this.props.pics
                ? this.props.pics[this.props.id] === ""
                  ? true
                  : false
                : true
            }
          >
            Subir Foto
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default FormPictures;
