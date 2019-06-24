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
            perPage={5}
        >
            <Responsive
                medium={
                    <Datagrid>
                        {/* <TextField source="id" /> */}
                        <TextField source="name"/>
                        <BooleanField source="dnssec" label="DNSSEC" />
                        <TextField source="type" />
                        <TextField source="author" label="Owner"/>
                        {/* {role === 'user' && <ShowButton/>} */}
                        <ShowButton/>
                        {(role === 'superadmin') && <EditButton />}
                        {(role === 'superadmin') && <DeleteButton />}
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