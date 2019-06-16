import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser} from 'react-admin';
import { createBrowserHistory } from 'history';
import authProvider from './authProvider';
import UserList from './components/UserList';
import UserIcon from '@material-ui/icons/People';
import dataProvider from './dataProvider';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import { permissionsCheck } from './helpers';

const history = createBrowserHistory();

const App = () => (
  <Admin 
    title="PDNS Admin"
    dataProvider={dataProvider}
    history={history}
    authProvider={authProvider}
  >
      {/* <Resource name="users" list={ListGuesser} edit={EditGuesser}/> */}
      <Resource 
        name="users" 
        list={UserList} 
        icon={UserIcon} 
        show={ShowGuesser} 
        create={UserCreate}
        edit={UserEdit}
      />
  </Admin>
)

export default App;
