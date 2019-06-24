import React from 'react';
import { 
    TabbedShowLayout, Show,
    ReferenceManyField, Datagrid, BooleanField, TextField,
    Tab, SingleFieldList, FunctionField, CardActions, Button, Link, SimpleShowLayout
} from 'react-admin';
import ListIcon from "@material-ui/icons/List";

export const HistoryShow = props => {
    // console.log('HistoryShow props', props);
    const {basePath, id} = props;
    const {hasPrevData, hasNewData, target} = getItemInfo(+id) || {};
    const isUpdate = (hasNewData && hasPrevData) ? true : false;
    const dataPropName = !isUpdate ? (hasNewData ? 'newData' : 'previousData') : '';
    console.log('targeeet', {dataPropName, isUpdate});
    return (
        <Show {...props} title="Action details" 
            actions={<HistoryShowActions basePath={basePath}/>}
        >
            {
                target === 'domains' ? 
                <SimpleShowLayout>
                    <TextField label='ACTION' source='text'/>
                    <FunctionField label="Name" render={rec => isUpdate ? getDiff(rec, 'name') : rec[dataPropName].name}/>
                    <FunctionField label="DNSSEC" render={rec => isUpdate ? getDiff(rec, 'dnssec') : ((typeof rec[dataPropName].dnssec === 'boolean') && rec[dataPropName].dnssec.toString())}/>
                    <FunctionField label="Primary NS" render={rec => isUpdate ? getDiff(rec, 'primary') : rec[dataPropName].primary}/>
                    <FunctionField label="Refresh" render={rec => isUpdate ? getDiff(rec, 'refresh') : rec[dataPropName].refresh}/>
                    <FunctionField label="TTL" render={rec => isUpdate ? getDiff(rec, 'ttl') : rec[dataPropName].ttl}/>
                    <FunctionField label="Expire" render={rec => isUpdate ? getDiff(rec, 'expire') : rec[dataPropName].expire}/>
                    <FunctionField label="Retry" render={rec => isUpdate ? getDiff(rec, 'retry') : rec[dataPropName].retry}/>
                    <FunctionField label="Email" render={rec => isUpdate ? getDiff(rec, 'email') : rec[dataPropName].email}/>
                </SimpleShowLayout>
            
                : target === 'users' ? 
                <SimpleShowLayout>
                    <TextField label='ACTION' source='text'/>
                    <FunctionField label="Name" render={rec => isUpdate ? getDiff(rec, 'username') : rec[dataPropName].username}/>
                    <FunctionField label="Role" render={rec => isUpdate ? getDiff(rec, 'role') : rec[dataPropName].role}/>
                    <FunctionField label="Email" render={rec => isUpdate ? getDiff(rec, 'email') : rec[dataPropName].email}/>
                </SimpleShowLayout>
            
                : target === 'records' ?
                <SimpleShowLayout>
                    <TextField label='ACTION' source='text'/>
                    <FunctionField label="Name" render={rec => isUpdate ? getDiff(rec, 'name') : rec[dataPropName].name}/>
                    <FunctionField label="Content" render={rec => isUpdate ? getDiff(rec, 'content') : rec[dataPropName].content}/>
                    <FunctionField label="TTL" render={rec => isUpdate ? getDiff(rec, 'ttl') : rec[dataPropName].ttl}/>
                    <FunctionField label="Priority" render={rec => isUpdate ? getDiff(rec, 'priority') : rec[dataPropName].priority}/>
                    <FunctionField label="Disabled" render={rec => isUpdate ? getDiff(rec, 'disabled') : (rec[dataPropName].disabled && rec[dataPropName].disabled.toString())}/>
                    <FunctionField label="Email" render={rec => isUpdate ? getDiff(rec, 'email') : rec[dataPropName].email}/>
                </SimpleShowLayout>
                : target === 'managers' ?
                <SimpleShowLayout>
                     <TextField label='ACTION' source='text'/>
                     <FunctionField label="Username" render={rec => rec[dataPropName].username}/>
                </SimpleShowLayout> : null
            }
        </Show>
)};

const getDiff = (item, source) => {
    if(item.previousData[source] === item.newData[source]) return item.newData[source] && item.newData[source].toString();
    return `FROM ${item.previousData[source] && item.previousData[source].toString()} 
    TO ${item.newData[source] && item.newData[source].toString()}`
}

const HistoryShowActions = basePath => (
    <CardActions>
        <Button
            component={Link}
            to={{ 
                pathname: basePath,
            }}
            label="Histroy"
        >
            <ListIcon />
        </Button>
    </CardActions>
);

const domainTab = label => (
    <Tab label={label}>
        <TextField source="name" />
        <BooleanField source="dnssec" label="DNSSEC"/>
        <TextField source="primary" label="Primary NS"/>
        <TextField source="author" label='Owner'/>
        <TextField source="created_at" label='Created at' />
        <TextField source="last_modified" label='Last modified' />
    </Tab>
)

const getItemInfo = id => {
    let db = localStorage.getItem('data');
    if(db) {
        db = JSON.parse(db);
        const history = db.history;
        const item = history && history.find(item => item.id === id);
        if(!item) return null;
        return {
            target: item.target,
            hasPrevData: item.previousData ? true : false,
            hasNewData: item.newData ? true : false,
        }
    }
    return null
};

{/* <TabbedShowLayout>
                {
                    target === 'domains' && 
                    <Tab label='New'>
                        <FunctionField label="Name" render={rec => rec.newData.name}/>
                        <FunctionField label="DNSSEC" render={rec => rec.newData.dnssec.toString()}/>
                        <FunctionField label="Primary NS" render={rec => rec.newData.primary}/>
                        <FunctionField label="Refresh" render={rec => rec.newData.refresh}/>
                        <FunctionField label="TTL" render={rec => rec.newData.ttl}/>
                        <FunctionField label="Expire" render={rec => rec.newData.expire}/>
                        <FunctionField label="Retry" render={rec => rec.newData.retry}/>
                        <FunctionField label="Email" render={rec => rec.newData.email}/>
                    </Tab>
                }
                {
                    hasPrevData && 
                    <Tab label="Prev">
                        <ReferenceManyField reference="records" target="domain_id" addLabel={false}>
                            <Datagrid>
                                <TextField source="name" />
                                <BooleanField source="disabled" valueLabelTrue="Disabled" valueLabelFalse="Enabled"/>
                                <TextField source="content" />
                                <TextField source="ttl" label="TTL" />
                                <TextField source="type" />
                            </Datagrid>
                        </ReferenceManyField>
                    </Tab>
                }
            </TabbedShowLayout> */}