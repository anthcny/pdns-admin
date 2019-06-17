import React from 'react';
import { 
    Edit, TabbedForm, TextInput, BooleanInput, DeleteButton, Link,
    ReferenceManyField, Datagrid, BooleanField, TextField, FormTab, Button
} from 'react-admin';
import EditIcon from "@material-ui/icons/Edit";
import {DomainEditActions} from './DomainEditActions';
import moment from 'moment';
moment.locale('ru');

export const DomainEdit = props => {
    const {basePath, id} = props;
    const defaultValues = {
        last_modified: moment().format('MMMM Do YYYY, h:mm a'),
    }

    return (
    <Edit {...props} title="Edit domain" actions={<DomainEditActions listLabel='domains'/>}>
        <TabbedForm validate={validateDomianEdition} defaultValue={defaultValues}>
            <FormTab label="Domain">
                <TextInput source="name" />
                <BooleanInput source="dnssec" label="DNSSEC"/>
                <TextField source="author" />
                <TextField source="created_at" label='Created at' />
                <TextField source="last_modified" label='Last modified' />
            </FormTab>
            <FormTab label="Records">
                <ReferenceManyField reference="records" target="domain_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="name" />
                        <BooleanField source="disabled" valueLabelTrue="Disabled" valueLabelFalse="Enabled"/>
                        <TextField source="content" />
                        <TextField source="ttl" label="TTL" />
                        <TextField source="type" />
                        <RecordEditButton />
                        <DeleteButton redirect={`/domains/${id}/1`}/>
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
            <FormTab label="Managers">
                <ReferenceManyField 
                    reference="managers" 
                    target="domain_id" 
                    label="Users who have access to this domain"
                    addLabel={true}
                >
                    <Datagrid>
                        <TextField source="username" label="Username"/>
                        <DeleteButton redirect={`${basePath}/${id}/2`}/>
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
        </TabbedForm>
        {/* <SimpleForm validate={validateDomianEdition}>
            <TextInput source="name" />
            <BooleanInput source="dnssec" label="DNSSEC"/>
            <ReferenceArrayInput label="Managers" reference="managers" source="users">
                <TextInput source="username" label="Username"/>
                <SelectArrayInput optionText="username" />
            </ReferenceArrayInput>
            <TextField source="author" />
            <TextField source="created_at" label='Created at' />
            <TextField source="last_modified" label='Last modified' />
        </SimpleForm> */}
    </Edit>
)};

const RecordEditButton = props => {
    const {id, domain_id} = props.record || {};

    return (
        <Button
            component={Link}
            to={{
                pathname: `/records/${id}`,
                search: typeof domain_id === 'number' && `?domain_id=${domain_id}&from=edit`
            }}
            label="Edit"
        >
            <EditIcon />
        </Button>
)};

const validateDomianEdition = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = ['Required'];
    }
    return errors
};