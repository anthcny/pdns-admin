import React from 'react';
import { Edit, SimpleForm, TextInput, SelectInput, TextField, CardActions, Button, Link } from 'react-admin';
import { permissionsCheck } from '../../helpers';
import ListIcon from "@material-ui/icons/List";

export const UserEdit = props => {
    const role = permissionsCheck();
    return (
    <Edit {...props} title="User edition" actions={<UserEditActions/>}>
        <SimpleForm validate={validateUserEdit} redirect="/users">
            <TextField source="username" />
            {
                role === 'superadmin' ? 
                <SelectInput source="role" label="Permissions" choices={[
                    { id: 'admin', name: 'Admin' },
                    { id: 'user', name: 'User' },
                ]} />
                : <TextField source="role" label="Permissions"/>
            }
            
            <TextInput source="email" type="email" label="Email Address"/>
            <TextInput source="password" label="New password" type="password"/>
            {/* <TextInput label="Repeat password" type="password"/> */}
        </SimpleForm>
    </Edit>
)};

const validateUserEdit = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = ['Required'];
    }
    if (!values.role) {
        errors.role = ['Please, select permission type'];
    }
    if (!values.password) {
        errors.password = ['Please, enter password'];
    }
    return errors
};

const UserEditActions = () => (
    <CardActions>
        <Button
            component={Link}
            to={{ 
                pathname: '/users',
            }}
            label="Users"
        >
            <ListIcon />
        </Button>
    </CardActions>
);