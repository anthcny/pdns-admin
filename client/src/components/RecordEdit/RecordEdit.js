import React from 'react';
import { Edit, SimpleForm, TextInput, SelectInput, BooleanInput, LongTextInput } from 'react-admin';
import {DomainShowActions} from '../DomainShow/DomainShowActions';
import { parse } from "query-string";
import moment from 'moment';
moment.locale('ru');

export const RecordEdit = props => {
    const {from: from_string} = parse(props.location.search);
    const { domain_id: domain_id_string } = parse(props.location.search);
    const domain_id = domain_id_string ? parseInt(domain_id_string, 10) : '';
    const redirect = typeof domain_id === 'number' ? `/domains/${domain_id}/${from_string === 'edit' ? '' : 'show/'}1` : 'show';

    return (
        <Edit 
            {...props} title="Edit record"
            actions={<DomainShowActions data={domain_id} basePath={redirect} useCancel={'cancel edit'} listLabel={'records'}/>}
        >
            <SimpleForm 
                validate={validateRecordEdition} 
                redirect={redirect}
                defaultValue={defaultValues}
            >
                <TextInput source="name" />
                <SelectInput source="type" choices={typeChoices}/>
                <TextInput source="ttl" label="TTL"/>
                <TextInput source="priority"/>
                <LongTextInput source="content" />
                <BooleanInput source="disabled" label="Disabled"/>
            </SimpleForm>
        </Edit>
)};

const validateRecordEdition = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = ['Required'];
    }
    if (!values.type) {
        errors.type = ['Required'];
    }
    if (!Number.isInteger(+values.priority)) {
        errors.priority = ['Number field'];
    }
    if (!values.priority) {
        errors.priority = ['Required'];
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
    last_modified: moment().format('MMMM Do YYYY, h:mm a') + `${username && (' by ' + username)}`,
};

const typeChoices = [
    { id: 'NS', name: 'NS' },
    // { id: 'SOA', name: 'SOA' },
    { id: 'A', name: 'A' },
    { id: 'MX', name: 'MX' },
    { id: 'CNAME', name: 'CNAME' },
    { id: 'PTR', name: 'PTR' },
    { id: 'SRV', name: 'SRV' },
    { id: 'AAAA', name: 'AAAA' },
];