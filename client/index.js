import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Router, Route } from "react-router-dom";
import history from "./utils/history";
import App from "./components/containers/App";
import LoginContainer from "./components/containers/LoginContainer";
import ContactoContainer from "./components/containers/ContactoContainer";
import InicioContainer from "./components/containers/InicioContainer";
import TarifasContainer from "./components/containers/TarifasContainer";
import InstalacionesContainer from "./components/containers/InstalacionesContainer";
import EquipoContainer from "./components/containers/EquipoContainer";
import ServiciosContainer from "./components/containers/ServiciosContainer";
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

const port = process.env.PORT || 4000;
const client = new ApolloClient({
  uri: `https://stormy-meadow-66204.herokuapp.com:/graphql`,
  cache
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          <Route path="/" component={App} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/contacto" component={ContactoContainer} />
          <Route path="/inicio" component={InicioContainer} />
          <Route path="/servicios" component={ServiciosContainer} />
          <Route path="/instalaciones" component={InstalacionesContainer} />
          <Route path="/tarifas" component={TarifasContainer} />
          <Route path="/equipo" component={EquipoContainer} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
