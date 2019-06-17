import React from 'react';
import { Create, SimpleForm, TextInput, SelectInput } from 'react-admin';
import { permissionsCheck } from '../../helpers';
import moment from 'moment';
moment.locale('ru');

export const UserCreate = props => (
    <Create {...props} title="Create new user">
        <SimpleForm validate={validateUserCreation} redirect="users" defaultValue={userDefaultValue}>
            <TextInput source="username" />
            <TextInput source="password" type="password"/>
            <SelectInput source="role" label="Permissions" choices={getPermissionChoices()} />
            <TextInput source="email" type="email" label="Email Address"/>
            {/* <TextInput label="Repeat password" type="password"/> */}
        </SimpleForm>
    </Create>
);

const validateUserCreation = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = ['Required'];
    }
    if (!values.email) {
        errors.email = ['Required'];
    }
    if (!values.role) {
        errors.role = ['Please, select permission type'];
    }
    if (!values.password) {
            errors.password = ['Required'];
    }
    return errors
};

const getPermissionChoices = () => {
    const role = permissionsCheck();
    const choices = [{ id: 'user', name: 'User' }];
    if(role === 'superadmin'){
        choices.push({ id: 'admin', name: 'Admin' });
    }
    return choices;
}

const username = localStorage.getItem('username');

const userDefaultValue = { 
    created_at: moment().format('MMMM Do YYYY, h:mm a') + `${username && (' by ' + username)}`,
    role: 'user' 
};