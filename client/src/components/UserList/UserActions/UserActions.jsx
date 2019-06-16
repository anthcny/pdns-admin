import React from 'react';
import Button from '@material-ui/core/Button';
import { CardActions, CreateButton } from 'react-admin';
import {permissionsCheck} from '../../../helpers';

export const UserActions = ({
    basePath,
}) => {
    const role = permissionsCheck();
    return (
    <CardActions>
        {
            role === 'admin' || role === 'superadmin' &&
            <CreateButton basePath={basePath} />
        }
        {/* <Button color="primary" onClick={() => console.log('Custom Action clicked')}>Custom Action</Button> */}
    </CardActions>
)};