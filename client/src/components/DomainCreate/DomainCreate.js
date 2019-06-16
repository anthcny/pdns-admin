import React from 'react';
import { Create, SimpleForm, TextInput, SelectInput, BooleanInput } from 'react-admin';

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

const defaultValues = {
    type: 'master',
    dnssec: false,
}