import React from 'react';
import { 
    Create, SimpleForm, TextInput, SelectInput, BooleanInput, 
    Toolbar, SaveButton, RefreshButton
} from 'react-admin';
import { parse } from "query-string";

export const RecordCreate = props => {
    console.log('recprosp', props);
    const { domain_id: domain_id_string } = parse(props.location.search);
    const domain_id = domain_id_string ? parseInt(domain_id_string, 10) : '';
    const redirect = typeof domain_id === 'number' ? `/domains/${domain_id}/show/1` : 'show';

    return (
        <Create {...props} title="Create new record">
            <SimpleForm 
                validate={validateZoneCreation} 
                redirect={redirect} 
                defaultValue={{...defaultValues, domain_id}}
                // toolbar={<RecordCreateToolbar />}
            >
                <TextInput source="name" />
                <SelectInput source="type" choices={typeChoices}/>
                <TextInput source="ttl" label="TTL"/>
                <TextInput source="content" />
                <BooleanInput source="disabled" label="Disabled"/>
            </SimpleForm>
        </Create>
)};

const validateZoneCreation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = ['Required'];
    }
    if (!values.type) {
        errors.type = ['Required'];
    }
    if (!values.ttl) {
        errors.ttl = ['Required'];
    }
    if (!values.content) {
        errors.content = ['Required'];
    }
    return errors
};

const defaultValues = {
    type: 'A',
    disabled: false,
};

const typeChoices = [
    { id: 'A', name: 'A' },
    { id: 'NS', name: 'NS' },
    { id: 'MX', name: 'MX' },
]

const RecordCreateToolbar = props => {
    // const { data } = props;
    return (
    <Toolbar {...props}>
       <SaveButton/>
       <RefreshButton/>
    </Toolbar>
)};