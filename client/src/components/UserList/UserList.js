import React from 'react';
import { List, Datagrid, TextField, SimpleList, Responsive } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="role" />
                    <TextField source="email" />
                    <TextField source="phone" />
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
);
