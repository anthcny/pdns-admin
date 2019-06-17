import FakeRest from 'fakerest';
import axios from 'axios';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';
import moment from 'moment';
moment.locale('ru');

let db = {};

/* eslint-disable no-console */
function log(type, resource, params, response) {
    if (console.group) {
        // Better logging in Chrome
        console.groupCollapsed(type, resource, JSON.stringify(params));
        console.log(response);
        console.groupEnd();
    } else {
        console.log('FakeRest request ', type, resource, params);
        console.log('FakeRest response', response);
    }
}


export default (data, loggingEnabled = false) => {
    const restServer = new FakeRest.Server();
    restServer.init(data);
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }

    function getResponse(type, resource, params) {
        // console.log('provider log', {type, resource, params});
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: params.filter,
                };
                return {
                    data: restServer.getAll(resource, query),
                    total: restServer.getCount(resource, {
                        filter: params.filter,
                    }),
                };
            }
            case GET_ONE:
                // if(params.id === "users") params.id = 0;
                return {
                    data: restServer.getOne(resource, params.id, { ...params }),
                };
            case GET_MANY:
                return {
                    data: restServer.getAll(resource, {
                        filter: { id: params.ids },
                    }),
                };
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: { ...params.filter, [params.target]: params.id },
                };
                return {
                    data: restServer.getAll(resource, query),
                    total: restServer.getCount(resource, {
                        filter: query.filter,
                    }),
                };
            }
            case UPDATE:
                handleUserAction(resource, params, 'update');
                historyLog(resource, params, type)
                return {
                    data: restServer.updateOne(resource, params.id, {
                        ...params.data,
                    }),
                };
            case UPDATE_MANY:
                historyLog(resource, params, type)
                params.ids.forEach(id =>
                    restServer.updateOne(resource, id, {
                        ...params.data,
                    })
                );
                return { data: params.ids };
            case CREATE:
                handleUserAction(resource, params, 'create');
                historyLog(resource, params, type);
                return {
                    data: restServer.addOne(resource, { ...params.data }),
                };
            case DELETE:
                historyLog(resource, params, type)
                return { data: restServer.removeOne(resource, params.id) };
            case DELETE_MANY:
                historyLog(resource, params, type)
                params.ids.forEach(id => restServer.removeOne(resource, id));
                return { data: params.ids };
            default:
                return false;
        }
    }

    function historyLog(resource, params, type) {
        const username = localStorage.getItem('username');
        const { data, previousData } = params;
        // const saveData = data || previousData;
        // delete saveData.id;
        data && (delete data.id)
        previousData && (delete previousData.id)
        const log = restServer.addOne('history', {
            newData: data, 
            previousData,
            author: username,
            text: `${type} ${resource}`,
            time: moment().format('MMMM Do YYYY, h:mm a'),
        });

        // return console.log('historyLog', log);
    }

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Promise} The response
     */
    return (type, resource, params) => {
        const collection = restServer.getCollection(resource);
        if (!collection) {
            return new Promise((_, reject) =>
                reject(new Error(`Undefined collection "${resource}"`))
            );
        }
        let response;
        try {
            response = getResponse(type, resource, params);
        } catch (error) {
            return new Promise((_, reject) => reject(error));
        }
        if (response === false) {
            return new Promise((_, reject) =>
                reject(new Error(`Unsupported fetch action type ${type}`))
            );
        }
        if (loggingEnabled) {
            log(type, resource, params, response);
        }
        // saveLocal(collection);
        return new Promise(resolve => resolve(response));
    };
};

const saveLocal = collection => {
    const {items, name} = collection;
    db[name] = items;
    const saveDB = JSON.stringify(db);
    return localStorage.setItem('data', saveDB);
}

const handleUserAction = async (resource, params, type) => {
    const dto = {...params.data};
    if(type === 'update'){
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const headers = {
            token,
            username,
            update: true,
        }
        dto.headers = headers;
    }
    if(resource === 'users'){
        return await axios.post('/api/sign/up', dto)
            .then(res => {
                return console.log('CREATE SUCCESS!', res);
            })
            .catch(e => console.log('Create failed', e));
    }
}
