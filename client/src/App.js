import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { createBrowserHistory } from 'history';
import authProvider from './authProvider';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const history = createBrowserHistory();

const App = () => (
  <Admin 
    dataProvider={dataProvider}
    history={history}
    authProvider={authProvider}
  >
      <Resource name="users" list={ListGuesser}/>
  </Admin>
)

export default App;
