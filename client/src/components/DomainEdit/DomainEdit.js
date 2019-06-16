import React from 'react';
import { 
    Edit, TabbedForm, TextInput, BooleanInput, DeleteButton,
    ReferenceManyField, Datagrid, EditButton , BooleanField, TextField,
    FormTab,
} from 'react-admin';
import {DomainShowActions} from '../DomainShow/DomainShowActions';

export const DomainEdit = props => (
    <Edit {...props} title="Edit domain" actions={<DomainShowActions/>}>
        <TabbedForm>
            <FormTab label="Domain">
                <TextInput source="name" />
                <BooleanInput source="dnssec" label="DNSSEC"/>
            </FormTab>
            <FormTab label="Records">
                <ReferenceManyField reference="records" target="domain_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="name" />
                        <BooleanField source="disabled" valueLabelTrue="Disabled" valueLabelFalse="Enabled"/>
                        <TextField source="content" />
                        <TextField source="ttl" label="TTL" />
                        <TextField source="type" />
                        <EditButton />
                        <DeleteButton/>
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
        </TabbedForm>
    </Edit>
);

const validateDomianEdition = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = ['Required'];
    }
    return errors
};