import React from 'react';
import { 
    TabbedShowLayout, Show,
    ReferenceManyField, Datagrid, EditButton , BooleanField, TextField,
    Tab,
} from 'react-admin';
import {DomainShowActions} from './DomainShowActions';

export const DomainShow = props => (
    <Show {...props} title="Edit domain" 
        actions={<DomainShowActions/>}
    >
        <TabbedShowLayout>
            <Tab label="Domain">
                <TextField source="name" />
                <BooleanField source="dnssec" label="DNSSEC"/>
            </Tab>
            <Tab label="Records">
                <ReferenceManyField reference="records" target="domain_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="name" />
                        <BooleanField source="disabled" valueLabelTrue="Disabled" valueLabelFalse="Enabled"/>
                        <TextField source="content" />
                        <TextField source="ttl" label="TTL" />
                        <TextField source="type" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);