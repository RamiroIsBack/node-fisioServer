import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class InicioForm extends Component {
  constructor() {
    super();
    this.state = { parameters: { inicioTextoCorto: "", inicioTextoLargo: "" } };
  }
  handleOnChange(e) {
    let obj = Object.assign({}, this.state);
    obj.parameters[e.target.name] = e.target.value;
    this.setState(obj);
  }
  handleOnSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.parameters);
  }
  render() {
    return (
      <div>
        <p>
          primero te aparece lo que hay en la base de datos, que es lo q esta
          apareciendo en la web hasta ahora, debajo tienes hueco para escribir o
          subir una foto y debajo un boton para hacer el cambio
        </p>
        <br />
        <FormGroup>
          <Label for="textoCortoDB">
            Texto corto que aparece arriba en la pagina de inicio
          </Label>
          <Input id="textoCortoDB" readOnly="readonly" />
          <Label for="textoCorto">
            Texto corto que aparece arriba en la pagina de inicio
          </Label>
          <Input
            id="textoCorto"
            placeholder="la mejor clinica de fisioterapia del mundo :P"
          />
        </FormGroup>
        <FormGroup>
          <Label for="textoCorto">
            Texto corto que aparece arriba en la pagina de inicio
          </Label>
          <Input
            type="textarea"
            id="textoLargo"
            placeholder="bla bla bla lskjwopobz oxbzpoxiasd vaspodivs osiv o sdviopsvopsdv osd.
poxcivoxivapoij vapoisdjv poivjsdovi jsodiv sdpoivj sd jpaoijvposdij vasoj asdvioasoijsdvpoijsdv poiasdj oiaj bla bla bla.
lxjosj vkjsoijfwpoei uapoiuwerpo oqwieufoiweupweapdif oisadf pou pi iaoisuf ioaweuf oaieuf paoiudf poaiweuf poaiweufosivujoijavaopi asoivmasdoimasodiv mas asoivm aoim aoisdm aoi maois maosim vasoivm apoivm asiovm aopisdmv pdimv aopidmv poaidmv ma.
bla bla bla bla bla!"
          />
        </FormGroup>
        <div className="input-field">
          <input
            name="inicioTextoCorto"
            placeholder="inicioTextoCorto"
            value={this.state.inicioTextoCorto}
            onChange={this.handleOnChange.bind(this)}
          />
        </div>
        <div className="input-field">
          <input
            name="inicioTextoLargo"
            placeholder="inicioTextoLargo"
            value={this.state.inicioTextoLargo}
            onChange={this.handleOnChange.bind(this)}
          />
        </div>

        <div className="errors">
          {this.props.errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </div>
        <button className="btn">submit</button>
      </div>
    );
  }
}

export default InicioForm;
