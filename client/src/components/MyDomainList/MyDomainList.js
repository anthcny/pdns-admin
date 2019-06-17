import React from 'react';
import { List, Datagrid, TextField, SimpleList, Responsive,
     EditButton, ShowButton, BooleanField, DeleteButton, 
} from 'react-admin';
import UserActions from '../UserList/UserActions';
// import {DomainBulkActions} from './DomainBulkActions';
import { permissionsCheck } from '../../helpers';

export const MyDomainList = props => {
    const role = permissionsCheck();
    return (
        <List 
            {...props} 
            actions={<UserActions />} 
            // bulkActionButtons={<DomainBulkActions />}
        >
            <Datagrid>
                <TextField source="name"/>
                <BooleanField source="dnssec" label="DNSSEC" />
                <TextField source="type" />
                <TextField source="primary"/>
                <ShowButton/>
                {(role === 'admin' || role === 'superadmin') && <EditButton />}
                {(role === 'admin' || role === 'superadmin') && <DeleteButton />}
            </Datagrid>
        </List>
)};