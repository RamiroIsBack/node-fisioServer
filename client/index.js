import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import requireAuth from "./components/requireAuth";
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
      <BrowserRouter>
        <div>
          <Route path="/" component={App} />
          <Route path="/login" component={LoginForm} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
