import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');


function test() {
  fetch('/api/test/ok').then(r => r.text()).then(console.log);
}

const App = () => (
  <Admin dataProvider={dataProvider}>
      <Resource name="users" list={ListGuesser}/>
  </Admin>
)

export default App;
