import React from 'react';
import { 
    TabbedShowLayout, Show,
    ReferenceManyField, Datagrid, DeleteButton , BooleanField, TextField,
    Tab, Button, Link,
} from 'react-admin';
import EditIcon from "@material-ui/icons/Edit";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import {DomainShowActions} from './DomainShowActions';

export const DomainShow = props => {
    const {basePath, id} = props;

    return (
        <Show {...props} title="Edit domain" 
            actions={<DomainShowActions listLabel='domains'/>}
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
                            <RecordShowButton />
                            <RecordEditButton />
                            <DeleteButton redirect={`${basePath}/${id}/show/1`}/>
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
            </TabbedShowLayout>
        </Show>
)};

const RecordEditButton = props => {
    const {id, domain_id} = props.record || {};

    return (
        <Button
            component={Link}
            to={{
                pathname: `/records/${id}`,
                search: typeof domain_id === 'number' && `?domain_id=${domain_id}`
            }}
            label="Edit"
        >
            <EditIcon />
        </Button>
)};

const RecordShowButton = props => {
    const {id, domain_id} = props.record || {};

    return (
        <Button
            component={Link}
            to={{
                pathname: `/records/${id}/show`,
                search: typeof domain_id === 'number' && `?domain_id=${domain_id}`
            }}
            label="Show"
        >
            <RemoveRedEyeIcon />
        </Button>
)};