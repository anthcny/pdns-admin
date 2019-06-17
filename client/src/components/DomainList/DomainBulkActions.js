import React, { Fragment } from 'react';
import { BulkDeleteButton } from 'react-admin';
import {permissionsCheck} from '../../helpers';

export const DomainBulkActions = props => {
    const role = permissionsCheck();
    return (
        <Fragment>
            {
                role === 'superadmin' &&
                <BulkDeleteButton {...props} />
            }
        </Fragment>
)};