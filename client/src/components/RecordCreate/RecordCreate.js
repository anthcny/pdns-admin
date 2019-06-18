import React from 'react';
import { 
    Create, SimpleForm, TextInput, SelectInput, BooleanInput, LongTextInput,
} from 'react-admin';
import { parse } from "query-string";
import moment from 'moment';
moment.locale('ru');

export const RecordCreate = props => {
    const { domain_id: domain_id_string } = parse(props.location.search);
    const domain_id = domain_id_string ? parseInt(domain_id_string, 10) : '';
    const redirect = typeof domain_id === 'number' ? `/domains/${domain_id}/show/1` : 'show';

    return (
        <Create {...props} title="Create new record">
            <SimpleForm 
                validate={validateRecordCreation} 
                redirect={redirect} 
                defaultValue={{...defaultValues, domain_id}}
                // toolbar={<RecordCreateToolbar />}
            >
                <TextInput source="name" />
                <SelectInput source="type" choices={typeChoices}/>
                <TextInput source="ttl" label="TTL"/>
                <LongTextInput source="content" />
                <BooleanInput source="disabled" label="Disabled"/>
            </SimpleForm>
        </Create>
)};

const validateRecordCreation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = ['Required'];
    }
    if (!values.type) {
        errors.type = ['Required'];
    }
    if (!Number.isInteger(+values.ttl)) {
        errors.ttl = ['Number field'];
    }
    if (!values.ttl) {
        errors.ttl = ['Required'];
    }
    if (!values.content) {
        errors.content = ['Required'];
    }
    return errors
};

const username = localStorage.getItem('username');

const defaultValues = {
    type: 'NS',
    disabled: false,
    created_at: moment().format('MMMM Do YYYY, h:mm a') + `${username && (' by ' + username)}`,
    last_modified: 'no modified',
};

const typeChoices = [
    { id: 'NS', name: 'NS' },
    { id: 'SOA', name: 'SOA' },
    { id: 'A', name: 'A' },
    { id: 'MX', name: 'MX' },
    { id: 'CNAME', name: 'CNAME' },
    { id: 'PTR', name: 'PTR' },
    { id: 'SRV', name: 'SRV' },
];