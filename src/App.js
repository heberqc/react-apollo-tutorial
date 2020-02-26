import React from "react";
import "./styles.css";

import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: "https://rickandmortyapi.com/graphql"
});

const CharactersQuery = gql`
  {
    characters {
      results {
        id
        name
      }
    }
  }
`;

function Characters() {
  const { loading, error, data } = useQuery(CharactersQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.characters.results.map(({ id, name }) => (
    <p key={id}>
      {id}: {name}
    </p>
  ));
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Characters />
      </div>
    </ApolloProvider>
  );
}
