import React from 'react';
import { List, Datagrid, TextField, SimpleList, Responsive,
     EditButton, ShowButton, BooleanField, DeleteButton, 
} from 'react-admin';
import UserActions from '../UserList/UserActions';
import {DomainBulkActions} from './DomainBulkActions';
import { permissionsCheck } from '../../helpers';

export const DomainList = props => {
    const role = permissionsCheck();
    return (
        <List 
            {...props} 
            actions={<UserActions />} 
            bulkActionButtons={<DomainBulkActions />}
        >
            <Responsive
                medium={
                    <Datagrid>
                        {/* <TextField source="id" /> */}
                        <TextField source="name"/>
                        <BooleanField source="dnssec" label="DNSSEC" />
                        <TextField source="type" />
                        <TextField source="primary"/>
                        {/* {role === 'user' && <ShowButton/>} */}
                        <ShowButton/>
                        {role === 'admin' || role === 'superadmin' && <EditButton />}
                        {role === 'admin' || role === 'superadmin' && <DeleteButton />}
                    </Datagrid>
                }
                small={
                    <SimpleList
                        primaryText={record => record.title}
                        secondaryText={record => `${record.views} views`}
                        tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                    />
                }
            />
        </List>
)};