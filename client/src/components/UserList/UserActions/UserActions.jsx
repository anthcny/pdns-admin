import React from 'react';
import { CardActions, CreateButton } from 'react-admin';
import {permissionsCheck} from '../../../helpers';

export const UserActions = ({
    basePath,
}) => {
    const role = permissionsCheck();
    return (
    <CardActions>
        {
            (role === 'admin' || role === 'superadmin') &&
            <CreateButton basePath={basePath} />
        }
    </CardActions>
)};