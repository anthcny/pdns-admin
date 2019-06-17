import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import { CardActions, ListButton, Button, Link } from 'react-admin';

export const DomainShowActions = ({ basePath, data, useCancel, listLabel }) => (
    <CardActions>
        {
            useCancel 
            ? <CancelButton basePath={basePath} label={useCancel}/>
            : <ListButton basePath={basePath} label={listLabel}/>
        }
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

const CancelButton = ({ basePath, label }) => (
    <Button
        component={Link}
        to={{ pathname: basePath }}
        label={label}
    >
        <CancelIcon />
    </Button>
);