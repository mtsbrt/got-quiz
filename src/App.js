import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Questions from './components/questions/questions';


  const cache = new InMemoryCache();
  const link = new HttpLink({
    uri: 'https://api.8base.com/ck565dnjw000208jvcwz97n66'
  });
  const client = new ApolloClient({
    cache,
    link
  });

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Questions></Questions>
      </div>
    </ApolloProvider>
  );
}

export default App;
