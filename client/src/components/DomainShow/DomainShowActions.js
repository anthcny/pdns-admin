import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import { CardActions, ListButton, Button, Link } from 'react-admin';

export const DomainShowActions = ({ basePath, data, useCancel, listLabel, permissons }) => (
    <CardActions>
        {
            useCancel 
            ? <CancelButton basePath={basePath} label={useCancel}/>
            : <ListButton basePath={basePath} label={listLabel}/>
        }
    </CardActions>
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