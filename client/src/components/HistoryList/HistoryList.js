import React from 'react';
import { List, Datagrid, TextField, ShowButton } from 'react-admin';
import { permissionsCheck } from '../../helpers';

export const HistoryList = props => {
    const role = permissionsCheck();
    return (
        <List 
            {...props} 
            bulkActionButtons={false}
        >
            <Datagrid>
                <TextField source="author"/>
                <TextField source="time" />
                <TextField source="text" />
                <ShowButton/>
            </Datagrid>
        </List>
)};