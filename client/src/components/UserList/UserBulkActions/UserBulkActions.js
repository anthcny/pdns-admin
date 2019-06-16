import React, { Fragment } from 'react';
import { BulkDeleteButton } from 'react-admin';
// import ResetViewsButton from './ResetViewsButton';

export const UserBulkActions = props => (
    <Fragment>
        {/* <ResetViewsButton label="Reset Views" {...props} /> */}
        {/* Add the default bulk delete action */}
        <BulkDeleteButton {...props} />
    </Fragment>
);