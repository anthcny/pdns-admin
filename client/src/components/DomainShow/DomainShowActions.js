import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import { CardActions, ListButton, Button, Link } from 'react-admin';

export const DomainShowActions = ({ basePath, data }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <RecordCreateButton domain={data}/>
    </CardActions>
);

const RecordCreateButton = ({ domain }) => (
    <Button
        component={Link}
        to={{
            pathname: '/records/create',
            search: domain && `?domain_id=${domain.id}`
        }}
        label="Add new record"
    >
        <AddIcon />
    </Button>
);