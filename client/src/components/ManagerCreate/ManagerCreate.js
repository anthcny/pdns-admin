import React from 'react';
import { 
    Create, SimpleForm, TextInput, 
} from 'react-admin';
import { parse } from "query-string";

export const ManagerCreate = props => {
    const { domain_id: domain_id_string } = parse(props.location.search);
    const domain_id = domain_id_string ? parseInt(domain_id_string, 10) : '';
    const redirect = typeof domain_id === 'number' ? `/domains/${domain_id}/2` : 'show';

    return (
        <Create {...props} title="Add manager">
            <SimpleForm 
                validate={validateRecordCreation} 
                redirect={redirect} 
                defaultValue={{domain_id}}
                label=""
            >
                <TextInput source="username" />
            </SimpleForm>
        </Create>
)};

const validateRecordCreation = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = ['Required'];
    }
    return errors
};