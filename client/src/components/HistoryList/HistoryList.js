import React from 'react';
import { List, Datagrid, TextField, ShowButton } from 'react-admin';
import { permissionsCheck } from '../../helpers';

export const HistoryList = props => {
    const role = permissionsCheck();
    return (
        <List 
            {...props} 
            bulkActionButtons={false}
            perPage={5}
            exporter={false}
        >
            <Datagrid>
                <TextField source="author"/>
                <TextField source="time" />
                <TextField source="text" label="Action"/>
                <ShowButton/>
            </Datagrid>
        </List>
)};