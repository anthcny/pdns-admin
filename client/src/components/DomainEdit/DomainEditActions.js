import React from 'react';
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CancelIcon from "@material-ui/icons/Cancel";
import { CardActions, ListButton, Button, Link } from 'react-admin';

export const DomainEditActions = ({ basePath, data, useCancel, listLabel }) => (
    <CardActions>
        {
            useCancel 
            ? <CancelButton basePath={basePath} label={useCancel}/>
            : <ListButton basePath={basePath} label={listLabel}/>
        }
        <RecordCreateButton domain={data}/>
        {
            checkPermissionForAddManager(data && data.id) &&
                <AddUserButton domain={data}/>
        }
    </CardActions>
);

const AddUserButton = ({ domain }) => (
    <Button
        component={Link}
        to={{
            pathname: '/managers/create',
            search: domain && `?domain_id=${domain.id}`
        }}
        label="Add manager"
    >
        <PersonAddIcon />
    </Button>
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
        <PlaylistAddIcon />
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

const checkPermissionForAddManager = domain_id => {
    const username = localStorage.getItem('username');
    let db = localStorage.getItem('data');
    if(db) {
        db = JSON.parse(db);
        const { domains } = db;
        const domain = domains &&
            domains.find(d => d.id === domain_id && d.author === username);
        if(domain) return true;
    }
    return false;
}