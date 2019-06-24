import React from 'react';
import { Show, SimpleShowLayout, TextField, BooleanField } from 'react-admin';
import {DomainShowActions} from '../DomainShow/DomainShowActions';
import { parse } from "query-string";

export const RecordShow = props => {
    const { domain_id: domain_id_string } = parse(props.location.search);
    const domain_id = domain_id_string ? parseInt(domain_id_string, 10) : '';
    const redirect = typeof domain_id === 'number' ? `/domains/${domain_id}/show/1` : 'show';

    return (
        <Show 
            {...props} title="Record show"
            actions={<DomainShowActions data={domain_id} basePath={redirect}  listLabel={'records'}/>}
        >
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="type"/>
                <TextField source="ttl" label="TTL"/>
                <TextField source="priority"/>
                <TextField source="content" />
                <BooleanField source="disabled" label="Disabled"/>
                <TextField source="created_at" label='Created at' />
                <TextField source="last_modified" label='Last modified' />
            </SimpleShowLayout>
        </Show>
)};