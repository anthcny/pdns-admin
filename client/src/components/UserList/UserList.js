import React from 'react';
import { List, Datagrid, TextField, SimpleList, Responsive, EditButton, ShowButton } from 'react-admin';
import UserActions from './UserActions';
import UserBulkActions from './UserBulkActions';
import { permissionsCheck } from '../../helpers';

export const UserList = props => {
    const role = permissionsCheck();
    return (
        <List {...props} actions={<UserActions />} bulkActionButtons={<UserBulkActions />}>
            <Responsive
                medium={
                    <Datagrid rowClick={permissionsCheck}>
                        <TextField source="id" />
                        <TextField source="username" label='name'/>
                        <TextField source="role" />
                        <TextField source="email" />
                        <ShowButton/>
                        {role === 'admin' || role === 'superadmin' && <EditButton />}
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