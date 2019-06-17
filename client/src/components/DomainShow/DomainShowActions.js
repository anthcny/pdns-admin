import React from 'react';
import EditIcon from "@material-ui/icons/Edit";
import { CardActions, ListButton, Button, Link } from 'react-admin';

export const DomainShowActions = ({ basePath, listLabel, domain_id }) => (
    <CardActions>
        <ListButton basePath={basePath} label={listLabel}/>
        {
            checkPermissionForEdit(Number(domain_id)) &&
            <EditButton domain_id={domain_id}/>
        }
    </CardActions>
);

const EditButton = ({ domain_id }) => (
    <Button
        component={Link}
        to={{ 
            pathname: `/domains/${domain_id}`,
        }}
        label="EDIT"
    >
        <EditIcon />
    </Button>
);

const checkPermissionForEdit = domain_id => {
    const username = localStorage.getItem('username');
    let db = localStorage.getItem('data');
    if(db) {
        db = JSON.parse(db);
        const { managers } = db;

        const manager = managers && 
            managers.find(m => m.domain_id === domain_id && m.username === username);
        
        if(manager) return true;
        
        const { domains } = db;
        const domain = domains &&
            domains.find(d => d.id === domain_id && d.author === username);
        if(domain) return true;
    }
    return false;
}