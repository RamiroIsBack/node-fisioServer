import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class InicioForm extends Component {
  constructor() {
    super();
    this.state = { parameters: { inicioTextoCorto: "", inicioTextoLargo: "" } };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.id] = e.target.value;
    this.setState(obj);
  }
  handleOnSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.parameters);
  }
  subirTextoCorto(e) {
    this.props.subirTextoCorto(this.state.parameters.inicioTextoCorto);
  }
  subirTextoLargo(e) {
    this.props.subirTextoLargo(this.state.parameters.inicioTextoLargo);
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
          <Input id="textoCortoDB" readOnly="readonly" />
          <Label for="textoCorto">introduce lo q quieres que aparezca</Label>
          <Input
            id="inicioTextoCorto"
            placeholder="la mejor clinica de fisioterapia del mundo :P"
            value={this.state.inicioTextoCorto}
            onChange={this.handleOnChange.bind(this)}
          />
          <Button onClick={this.subirTextoCorto.bind(this)} color="primary">
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
          <Input id="textoLargoDB" readOnly="readonly" />
          <Label for="textoLargo">introduce lo q quieres que aparezca</Label>
          <Input
            type="textarea"
            rows="5"
            id="inicioTextoLargo"
            value={this.state.inicioTextoLargo}
            onChange={this.handleOnChange.bind(this)}
            placeholder={`bla bla bla lskjwopobz oxbzpoxiasd vaspodivs osiv o sdviopsvopsdv osd.
poxcivoxivapoij vapoisdjv poivjsdovi jsodiv sdpoivj sd jpaoijvposdij vasoj asdvioasoijsdvpoijsdv poiasdj oiaj bla bla bla.
lxjosj vkjsoijfwpoei uapoiuwerpo oqwieufoiweupweapdif oisadf pou pi iaoisuf ioaweuf oaieuf paoiudf poaiweuf poaiweufosivujoijavaopi asoivmasdoimasodiv mas asoivm aoim aoisdm aoi maois maosim vasoivm apoivm asiovm aopisdmv pdimv aopidmv poaidmv ma.
bla bla bla bla bla!`}
          />
          <Button onClick={this.subirTextoLargo.bind(this)} color="primary">
            Subir Texto Largo
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default InicioForm;
