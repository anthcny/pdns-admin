import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser} from 'react-admin';
import { createBrowserHistory } from 'history';
import authProvider from './authProvider';
import UserList from './components/UserList';
import UserIcon from '@material-ui/icons/People';
import HistoryIcon from '@material-ui/icons/History';
import dataProvider from './dataProvider';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import DomainList from './components/DomainList';
import DomainCreate from './components/DomainCreate';
import DomainEdit from './components/DomainEdit';
import DomainShow from './components/DomainShow';
import RecordCreate from './components/RecordCreate';
import RecordEdit from './components/RecordEdit';
import RecordShow from './components/RecordShow';
import ManagerCreate from './components/ManagerCreate';
import HistoryList from './components/HistoryList';
import { permissionsCheck } from './helpers';

const history = createBrowserHistory();

const App = () => (
  <Admin 
    title="PDNS Admin"
    dataProvider={dataProvider}
    history={history}
    authProvider={authProvider}
  >
    <Resource 
      name="domains" list={DomainList} 
      show={DomainShow} 
      create={permissionsCheck() === 'user' ? null : DomainCreate} 
      edit={DomainEdit}
    />
    <Resource 
      name="users" list={UserList} 
      icon={UserIcon} show={ShowGuesser} 
      create={UserCreate} edit={UserEdit}
    />
    <Resource name="records" create={RecordCreate} edit={RecordEdit} show={RecordShow}/>
    <Resource name="managers" create={ManagerCreate}/>
    <Resource name="history" list={HistoryList} icon={HistoryIcon} show={ShowGuesser}/>
  </Admin>
)

export default App;
