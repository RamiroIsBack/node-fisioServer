import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Router, Route } from "react-router-dom";
import history from "./utils/history";
import App from "./components/containers/App";
import LoginForm from "./components/containers/LoginForm";
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
          <Route path="/login" component={LoginForm} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
