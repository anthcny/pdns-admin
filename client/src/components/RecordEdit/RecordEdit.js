import React from 'react';
import { 
    Edit, SimpleForm, TextInput, SelectInput, BooleanInput, CardActions,
    ListButton,
} from 'react-admin';
import {DomainShowActions} from '../DomainShow/DomainShowActions';
import { parse } from "query-string";

export const RecordEdit = props => {
    const { domain_id: domain_id_string } = parse(props.location.search);
    const domain_id = domain_id_string ? parseInt(domain_id_string, 10) : '';
    const redirect = typeof domain_id === 'number' ? `/domains/${domain_id}/show/1` : 'show';

    return (
        <Edit 
            {...props} title="Edit record"
            actions={<DomainShowActions data={domain_id} basePath={redirect} useCancel={'cancel edit'}/>}
        >
            <SimpleForm 
                validate={validateRecordEdition} 
                redirect={redirect} 
                // defaultValue={{. domain_id}}
                // toolbar={<RecordCreateToolbar />}
            >
                <TextInput source="name" />
                <SelectInput source="type" choices={typeChoices}/>
                <TextInput source="ttl" label="TTL"/>
                <TextInput source="content" />
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
    if (!values.ttl) {
        errors.ttl = ['Required'];
    }
    if (!values.content) {
        errors.content = ['Required'];
    }
    return errors
};

const typeChoices = [
    { id: 'A', name: 'A' },
    { id: 'NS', name: 'NS' },
    { id: 'MX', name: 'MX' },
];

// export const RecordEditActions = ({ basePath, data }) => {
//     console.log('RecordEditActions', { basePath, data });
//     return (
//     <CardActions>
//         <ListButton basePath={basePath} />
//         <RecordCreateButton domain={data}/>
//     </CardActions>
// )};