import React, { Component } from "react";
import ServiciosForm from "../presentational/ServiciosForm";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../actions";

class ServiciosContainer extends Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  onSubmit(parameters) {
    axios({
      method: "post",
      url: "/copy/servicios",
      data: {
        servicios: [
          {
            nombre: "fisioterapia",
            precio: 50,
            duracion: 50,
            bono: {
              modalidad: "Bono",
              numero: 10,
              precio: 400
            },
            urlPic: "/fisioterapia.png",
            textoLargo: `bla bla bla lskjwopobz oxbzpoxiasd vaspodivs osiv o sdviopsvopsdv osd.
            poxcivoxivapoij vapoisdjv poivjsdovi jsodiv sdpoivj sd jpaoijvposdij vasoj asdvioasoijsdvpoijsdv poiasdj oiaj bla bla bla.
            lxjosj vkjsoijfwpoei uapoiuwerpo oqwieufoiweupweapdif oisadf pou pi iaoisuf ioaweuf oaieuf paoiudf poaiweuf poaiweufosivujoijavaopi asoivmasdoimasodiv mas asoivm aoim aoisdm aoi maois maosim vasoivm apoivm asiovm aopisdmv pdimv aopidmv poaidmv ma.
            bla bla bla bla bla!`,

            tecnicas: [
              {
                nombre: "fisioterapia deportiva",
                servicio: "fisioterapia",
                texto: `Bla bla bla bla bla, leiohsodos hsosdfs oshd osdhsosd.
                osdif hsosdf hsdoidf hsod sdhs s ss s dfdsf fhod so sh.
                Bla bla tldo aois spsi poa paosaps aposidp pasipocpao asod as do a aiopsdpoi.`
              },

              {
                nombre: "radiología e imagen biomédica",
                servicio: "fisioterapia",
                texto: `Bla bla bla bla bla, leiohsodos hsosdfs oshd osdhsosd.
                osdif hsosdf hsdoidf hsod sdhs s ss s dfdsf fhod so sh.
                Bla bla tldo aois spsi poa paosaps aposidp pasipocpao asod as do a aiopsdpoi.`
              },

              {
                nombre: "vendaje neuromuscular",
                servicio: "fisioterapia",
                texto: `Bla bla bla bla bla, leiohsodos hsosdfs oshd osdhsosd.
                osdif hsosdf hsdoidf hsod sdhs s ss s dfdsf fhod so sh.
                Bla bla tldo aois spsi poa paosaps aposidp pasipocpao asod as do a aiopsdpoi.`
              }
            ]
          },
          {
            nombre: "osteopatia",
            precio: 50,
            duracion: 50,
            bono: {
              modalidad: "Bono",
              numero: 10,
              precio: 400
            },
            urlPic: "/osteopatia.png",
            textoLargo: `bla bla bla lskjwopobz oxbzpoxiasd vaspodivs osiv o sdviopsvopsdv osd.
            poxcivoxivapoij vapoisdjv poivjsdovi jsodiv sdpoivj sd jpaoijvposdij vasoj asdvioasoijsdvpoijsdv poiasdj oiaj bla bla bla.
            lxjosj vkjsoijfwpoei uapoiuwerpo oqwieufoiweupweapdif oisadf pou pi iaoisuf ioaweuf oaieuf paoiudf poaiweuf poaiweufosivujoijavaopi asoivmasdoimasodiv mas asoivm aoim aoisdm aoi maois maosim vasoivm apoivm asiovm aopisdmv pdimv aopidmv poaidmv ma.
            bla bla bla bla bla!`,

            tecnicas: [
              {
                nombre: "kinesiología",
                servicio: "osteopatia",
                texto: `Bla bla bla bla bla, leiohsodos hsosdfs oshd osdhsosd.
                osdif hsosdf hsdoidf hsod sdhs s ss s dfdsf fhod so sh.
                Bla bla tldo aois spsi poa paosaps aposidp pasipocpao asod as do a aiopsdpoi.`
              },

              {
                nombre: "control motor cervical",
                servicio: "osteopatia",
                texto: `Bla bla bla bla bla, leiohsodos hsosdfs oshd osdhsosd.
                osdif hsosdf hsdoidf hsod sdhs s ss s dfdsf fhod so sh.
                Bla bla tldo aois spsi poa paosaps aposidp pasipocpao asod as do a aiopsdpoi.`
              }
            ]
          },
          {
            nombre: "pilates",
            precio: 20,
            duracion: 50,
            bono: {
              modalidad: "mensual",
              numero: 8,
              precio: 80
            },
            horario: "M J 12:00-12:50 o L M 17:00-17:50",
            urlPic: "/pilates.png",
            textoLargo: `bla bla bla lskjwopobz oxbzpoxiasd vaspodivs osiv o sdviopsvopsdv osd.
            poxcivoxivapoij vapoisdjv poivjsdovi jsodiv sdpoivj sd jpaoijvposdij vasoj asdvioasoijsdvpoijsdv poiasdj oiaj bla bla bla.
            lxjosj vkjsoijfwpoei uapoiuwerpo oqwieufoiweupweapdif oisadf pou pi iaoisuf ioaweuf oaieuf paoiudf poaiweuf poaiweufosivujoijavaopi asoivmasdoimasodiv mas asoivm aoim aoisdm aoi maois maosim vasoivm apoivm asiovm aopisdmv pdimv aopidmv poaidmv ma.
            bla bla bla bla bla!`,

            tecnicas: [
              {
                nombre: "pilates aplicado a la fisioterapia",
                servicio: "pilates",
                texto: `Bla bla bla bla bla, leiohsodos hsosdfs oshd osdhsosd.
                osdif hsosdf hsdoidf hsod sdhs s ss s dfdsf fhod so sh.
                Bla bla tldo aois spsi poa paosaps aposidp pasipocpao asod as do a aiopsdpoi.`
              }
            ]
          }
        ]
      }
    })
      .then(res => {
        console.log(res);
        this.props.instalacionesReceived(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render(props) {
    return (
      <div className="container">
        <h3>Servicios</h3>
        <ServiciosForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    instalacionesReceived: instalacionesCopy =>
      dispatch(actions.instalacionesReceived(instalacionesCopy)),
    subirFoto: (id, archivo) => dispatch(actions.subirFoto(id, archivo))
  };
};

const stateToProps = state => {
  return {
    user: state.user,
    copy: state.copy
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(ServiciosContainer);
