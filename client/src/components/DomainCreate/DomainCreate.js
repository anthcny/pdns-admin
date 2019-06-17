import React from 'react';
import { Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';
import moment from 'moment';
moment.locale('ru');

export const DomainCreate = props => (
    <Create {...props} title="Create new master zone">
        <SimpleForm validate={validateDomianCreation} redirect="users" defaultValue={defaultValues}>
            <TextInput source="name" />
            <BooleanInput source="dnssec" label="DNSSEC"/>
        </SimpleForm>
    </Create>
);

const validateDomianCreation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = ['Required'];
    }
    return errors
};

const username = localStorage.getItem('username');

const defaultValues = {
    author: username,
    type: 'master',
    dnssec: false,
    created_at: moment().format('MMMM Do YYYY, h:mm a'),
    last_modified: 'no modified',
}