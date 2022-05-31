import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Footer from "./components/Footer/Footer";

import Home from "./Pages/Home";
import Signup from './Pages/Signup';
import SingleDrink from "./Pages/SingleDrink";
import Checkout from "./Pages/Checkout";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              /> 
              <Route
                path="/drink/:drinkId"
                element={<SingleDrink />}
              />
              <Route 
                path="/checkout"
                element={<Checkout />}
              />
            </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
